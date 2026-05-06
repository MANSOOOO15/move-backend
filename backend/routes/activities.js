const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

// ⚠️ PON AQUÍ TU URL Y TU KEY DE SUPABASE DE NUEVO
const supabase = createClient(
  "https://idekitaixawnvuszisbk.supabase.co",
  "sb_publishable_VYI-3mNFmoaQSqPH6LNhQw_TR7-gqml"
);

// GET: Leer todas las actividades de Supabase
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("activities").select("*");
  
  if (error) {
    console.log("❌ ERROR SUPABASE GET:", error.message);
    return res.status(500).json({ error: error.message });
  }
  
  res.json(data || []);
});

// POST: Guardar una nueva actividad en Supabase
router.post("/", async (req, res) => {
  const { data, error } = await supabase
    .from("activities")
    .insert([req.body])
    .select(); // <-- Esto es vital para que te devuelva lo guardado

  if (error) {
    console.log("❌ ERROR SUPABASE POST:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.json(data[0]);
});

module.exports = router;
