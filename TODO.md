### 📚 **Teoría de la Formulación y Optimización de Dietas**  

La formulación de dietas en nutrición animal (o humana) es un problema de **optimización lineal**, donde el objetivo es encontrar la combinación óptima de ingredientes que cumpla con ciertos requisitos nutricionales y minimice el costo.  

---

## 🔹 **1. Base Matemática del Problema**  
El problema se puede modelar como un **problema de Programación Lineal (PL)**, usando la siguiente estructura:  

\[
\text{Minimizar } C = \sum_{i=1}^{n} c_i x_i
\]

📌 **Explicación:**  
- \( C \) = Costo total de la dieta  
- \( c_i \) = Costo por kg de cada ingrediente \( i \)  
- \( x_i \) = Cantidad del ingrediente \( i \) en la dieta  
- \( n \) = Número total de ingredientes  

### 📌 **Restricciones Nutricionales:**  
Para cada nutriente \( j \) (por ejemplo, proteína, grasa, fibra), la cantidad aportada por todos los ingredientes debe estar dentro de un rango permitido:  

\[
\text{Min } N_j \leq \sum_{i=1}^{n} p_{ij} x_i \leq \text{Max } N_j
\]

📌 **Explicación:**  
- \( p_{ij} \) = Porcentaje del nutriente \( j \) en el ingrediente \( i \)  
- \( N_j \) = Cantidad mínima y máxima permitida del nutriente \( j \)  
- \( x_i \) = Cantidad del ingrediente \( i \) en la dieta  

---

## 🔹 **2. ¿Cómo funciona la optimización?**  
📌 **El objetivo es encontrar la mejor combinación de ingredientes que:**
1. **Minimice el costo total**  
2. **Cumpla los requerimientos nutricionales**  
3. **Se mantenga dentro de las cantidades máximas permitidas de cada ingrediente**  

👨‍🔬 Para resolverlo, se usan métodos como:  
- **Método Simplex** (para Programación Lineal)  
- **Métodos de Gradiente** (cuando hay restricciones más complejas)  
- **Algoritmos Evolutivos** (en optimización no lineal)  

---

## 🔹 **3. Interpretación de los Cálculos en Excel**  
Ahora que entendemos la teoría, veamos cómo el Excel aplica estos principios:  

📌 **1. Cálculo del aporte nutricional total:**  
\[
R4 = \sum (x_i \times p_{ij})
\]
> Se usa `SUMPRODUCT(C4:P4,$C$20:$P$20)` en Excel para calcularlo.  

📌 **2. Conversión de unidades:**  
> `=0.185 * 2.2` → Convierte kg a libras.  

📌 **3. Costos de ingredientes:**  
> `V4 = R4 * 40` → Multiplica por un factor de escala (posible cantidad en producción).  

📌 **4. Suma total de ingredientes utilizados:**  
> `R20 = SUM(C20:P20)`  

---

## 🚀 **Datos y Features para el Programa**  
Si queremos convertir esta hoja en un **software**, necesitamos definir las **features** y los datos de entrada.

### 📌 **Datos de Entrada (Features)**
Estos son los valores que el usuario deberá ingresar en el programa:

1️⃣ **Lista de Ingredientes**  
   - Nombre del ingrediente  
   - Precio por kg  
   - Composición nutricional (proteína, grasa, fibra, etc.)  

2️⃣ **Requerimientos Nutricionales**  
   - Mínimo y máximo permitido para cada nutriente  

3️⃣ **Restricciones de Formulación**  
   - Límite máximo de cada ingrediente  
   - Cantidad total de mezcla  

---

### 🖥️ **Estructura del Software**  
📌 **Inputs:**  
- Lista de ingredientes con costos y valores nutricionales  
- Requerimientos mínimos y máximos  
- Restricciones de cada ingrediente  

📌 **Proceso:**  
- Se usa **Optimización Lineal** para encontrar la combinación más barata cumpliendo los requerimientos.  
- Se implementa con `scipy.optimize` en Python o con un solver como **PuLP**.  

📌 **Outputs:**  
✅ Cantidad exacta de cada ingrediente a usar  
✅ Coste total de la dieta  
✅ Aporte de cada nutriente  

### 🖥️ **Actualización: Datos y Features para el Programa**  

Además del costo, los ingredientes y los requerimientos nutricionales, ahora **también incluiremos el peso total en kg que se desea formular**. Esto afectará directamente los cálculos y hará que el software pueda generar mezclas exactas según la cantidad deseada.  

---

## 📝 **Datos de Entrada (Features del Programa)**  
El usuario deberá ingresar los siguientes datos en el software:  

1️⃣ **Lista de Ingredientes** (Cada ingrediente tiene estas propiedades)  
   - 📌 **Nombre** (Ej: Maíz, Soya, Trigo)  
   - 💰 **Costo por kg** (Ej: $0.50 por kg)  
   - 🥩 **Composición Nutricional** (Ej: 7.9% Proteína, 3.5% Grasa, etc.)  
   - 🔢 **Límite máximo permitido** (Ej: Máximo 30% en la mezcla)  

2️⃣ **Requerimientos Nutricionales** (Mínimos y máximos para cada nutriente)  
   - 📊 **Proteína Bruta (PB %)** (Ej: Mín 18%, Máx 22%)  
   - 🛢️ **Grasa (EE %)** (Ej: Mín 5%, Máx 8%)  
   - 🏗️ **Fibra, Energía, etc.** (Otros parámetros nutricionales)  

3️⃣ **Peso Total de la Mezcla a Formular**  
   - ⚖️ **Ejemplo:** "Quiero formular 1000 kg de alimento".  
   - 📌 Este dato escalará las cantidades óptimas calculadas.  

4️⃣ **Restricciones de Ingredientes**  
   - ❌ **Cantidad mínima o máxima de cada ingrediente permitido**.  
   - 🚫 **Exclusión de ingredientes (si el usuario no quiere usar algún ingrediente)**.  

---

## 🏗️ **Cómo Afecta el Peso Total en los Cálculos**  
Una vez optimizada la mezcla, se debe **escalar la cantidad de cada ingrediente** para que la suma total sea igual al peso solicitado.  

**Ejemplo:**  
Si el software calcula una fórmula con estos valores óptimos para **100 kg** de alimento:  
- 50% Maíz → 50 kg  
- 30% Soya → 30 kg  
- 20% Trigo → 20 kg  

Pero el usuario quiere **1000 kg**, se escala así:  
- Maíz = **500 kg**  
- Soya = **300 kg**  
- Trigo = **200 kg**  

📌 Esto se hace con la fórmula:  
\[
x_i = x_i^{\text{optimizado}} \times \frac{\text{Peso solicitado}}{\text{Peso base optimizado}}
\]  
Esto garantiza que la proporción y los nutrientes sigan siendo correctos.  

--


