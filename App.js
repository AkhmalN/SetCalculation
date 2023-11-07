import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SetCalculator() {
  const [numSets, setNumSets] = useState(2); // Jumlah himpunan awal
  const [inputSets, setInputSets] = useState(Array(numSets).fill(""));
  const [selectedOperation, setSelectedOperation] = useState("union");
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    const setArrays = inputSets.map((input) => input.split(",").map(Number));

    if (selectedOperation === "union") {
      const resultSet = Array.from(new Set(setArrays.flat()));
      setResult(`Hasil Gabungan: ${resultSet.join(", ")}`);
    } else if (selectedOperation === "intersection") {
      const resultSet = setArrays.reduce((acc, set) =>
        acc.filter((value) => set.includes(value))
      );
      setResult(`Hasil Irisan: ${resultSet.join(", ")}`);
    } else if (selectedOperation === "difference") {
      const resultSet = setArrays[0].filter(
        (value) => !setArrays[1].includes(value)
      );
      setResult(`Hasil Selisih: ${resultSet.join(", ")}`);
    } else if (selectedOperation === "complement") {
      const resultSet = setArrays[0].filter(
        (value) => !setArrays[1].includes(value)
      );
      setResult(`Hasil Komplemen: ${resultSet.join(", ")}`);
    }
  };

  const renderSetInputs = () => {
    const setInputs = [];
    for (let i = 0; i < numSets; i++) {
      setInputs.push(
        <TextInput
          key={i}
          placeholder={`Himpunan ${i + 1} (pisahkan dengan koma)`}
          value={inputSets[i]}
          onChangeText={(text) => {
            const newInputSets = [...inputSets];
            newInputSets[i] = text;
            setInputSets(newInputSets);
          }}
          style={styles.input}
        />
      );
    }
    return setInputs;
  };

  const addSet = () => {
    // Tambahkan satu himpunan saat tombol "Tambah Himpunan" ditekan
    if (numSets < 4) {
      setNumSets(numSets + 1);
    }
  };

  const removeSet = () => {
    // Hapus satu himpunan saat tombol "Hapus Himpunan" ditekan
    if (numSets > 2) {
      setNumSets(numSets - 1);
      const newInputSets = [...inputSets];
      newInputSets.pop();
      setInputSets(newInputSets);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Calculator</Text>
      <ScrollView style={styles.scrollView}>{renderSetInputs()}</ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Tambah Himpunan" onPress={addSet} />
        <Button title="Hapus Himpunan" onPress={removeSet} />
      </View>
      <Text style={styles.label}>Pilih Operasi:</Text>
      <Picker
        selectedValue={selectedOperation}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedOperation(itemValue)
        }
        style={styles.picker}
      >
        <Picker.Item label="Gabungan" value="union" />
        <Picker.Item label="Irisan" value="intersection" />
        <Picker.Item label="Selisih" value="difference" />
        <Picker.Item label="Komplemen" value="complement" />
      </Picker>
      <Button title="Hitung" onPress={handleCalculate} />
      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  title: {
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  scrollView: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    width: "100%",
    height: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  result: {
    fontSize: 16,
    marginTop: 10,
  },
});
