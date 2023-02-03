import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const MovieTheater = ({ rows =5, columns=5 }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const handleSeatSelection = (row, column) => {
    let seat = row + "-" + column;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((item) => item !== seat));
    } else if (!bookedSeats.includes(seat)) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    selectedSeats.forEach((seat) => {
      let row = parseInt(seat.split("-")[0]);
      total += (row + 1) * 100;
    });
    return total;
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select a seat");
      return;
    }
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    setSelectedSeats([]);
    alert(
      `You have selected ${
        selectedSeats.length
      } seats. Total cost: Rs. ${calculateTotal()}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.movieHall}>
        <View style={styles.screen}>
          <Text style={styles.screenText}>SCREEN</Text>
        </View>
        <View style={styles.seatsContainer}>
          {Array.from({ length: rows }, (v, row) => (
            <View key={row} style={styles.rowContainer}>
              {Array.from({ length: columns }, (v, column) => (
                <TouchableOpacity
                  key={column}
                  style={[
                    styles.seat,
                    selectedSeats.includes(row + "-" + column)
                      ? styles.selectedSeat
                      : bookedSeats.includes(row + "-" + column)
                      ? styles.bookedSeat
                      : null,
                  ]}
                  onPress={() => handleSeatSelection(row, column)}
                />
              ))}
            </View>
          ))}
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: Rs {calculateTotal()}</Text>
          <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  movieHall: {
    width: 300,
    height: "80%",
    backgroundColor: "#cccccc",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  screen: {
    backgroundColor: "#000000",
    height: "10%",
    alignItems: "center",
    margin: 20,
    justifyContent: "center",
  },
  screenText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  seatsContainer: {
    flexDirection: "column",
    height: "60%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    width: "100%",
  },
  seat: {
    width: 30,
    height: 30,
    backgroundColor: "#ffffff",
    borderColor: "#0c0c0c",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  selectedSeat: {
    backgroundColor: "#0033cc",
  },
  bookedSeat: {
    backgroundColor: "#808080",
  },
  totalContainer: {
    height: "10%",
    alignItems: "center",
    flexDirection: "column",
    marginVertical: 20,
  },
  totalText: {
    fontSize: 20,
    marginRight: 20,
  },
  bookButton: {
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default MovieTheater;

