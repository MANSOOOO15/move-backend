import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

const API_URL = "https://move-api-i818.onrender.com"; // 🔥 CAMBIA ESTO

export default function HomeScreen() {
  const [data, setData] = useState<any[]>([]);
  const [status, setStatus] = useState("Listo");
  const [loading, setLoading] = useState(false);

  const loadActivities = async () => {
    setLoading(true);
    setStatus("Cargando...");

    try {
      const res = await fetch(`${API_URL}/api/activities`);

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const json = await res.json();
      setData(json);
      setStatus("✅ Datos cargados");
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createActivity = async () => {
    setLoading(true);
    setStatus("Creando actividad...");

    try {
      const res = await fetch(`${API_URL}/api/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "run",
          distance: Math.floor(Math.random() * 10) + 1,
          duration: 45,
        }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      setStatus("✅ Actividad creada");
      await loadActivities();
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text style={{ fontSize: 32, fontWeight: "900", color: "#000" }}>
        MOVE
      </Text>

      <Text style={{ marginVertical: 15, fontWeight: "600" }}>
        {status}
      </Text>

      {loading && <ActivityIndicator size="large" />}

      <TouchableOpacity
        onPress={createActivity}
        style={{
          backgroundColor: "#000",
          padding: 15,
          borderRadius: 12,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
          Crear actividad
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={loadActivities}
        style={{
          borderWidth: 2,
          borderColor: "#000",
          padding: 15,
          borderRadius: 12,
          marginTop: 10,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          Cargar actividades
        </Text>
      </TouchableOpacity>

      <ScrollView style={{ marginTop: 20 }}>
        {data.map((item, index) => (
          <View
            key={item.id || index}
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
          >
            <Text style={{ fontWeight: "700" }}>
              {item.type.toUpperCase()}
            </Text>
            <Text>{item.distance} km</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}