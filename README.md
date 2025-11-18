
# RULETA CASINO API (Prueba técnica- Backend)

Este proyecto implementa una API de backend para una ruleta de casino online, permitiendo la creación, apertura, registro de apuestas y cierre automatizado de ruletas para determinar ganadores.
## Características principales

- Gestión de Ruletas: Creación, apertura y cierre de ruletas.

- Apuestas Múltiples: Permite registrar un array de apuestas por número o color en una sola transacción.

- Validación Estricta: Las apuestas se validan por monto (máximo $10,000) y por valor (números 0-36, colores ROJO/NEGRO).

- Cálculo Automatizado de Pagos: Al cerrar la ruleta, se genera un número ganador y se calculan automáticamente las ganancias según las reglas:

    - Número Ganador: Paga 5 veces lo apostado.

    - Color Ganador: Paga 1.8 veces lo apostado.

- Regla de Color: Los números pares son ROJOS y los impares son NEGROS. El 0 es neutro para apuestas de color.
## Tecnologías utilizada

| Tecnología             | Descripción                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Node.js | Entorno de ejecución de JavaScript. |
| Express | Framework web minimalista y flexible para Node.js. |
| MongoDB | Base de datos NoSQL utilizada para almacenar los datos. |
| Mongoose | Librería de modelado de objetos para MongoDB en Node.js. |
| dotenv | Para la gestión de variables de entorno. |
| nodemon | Para reinicio automatico del servidor y detección de cambios |

## Instalación

1. Clonar el repositorio
```bash
  git clone https://github.com/DanielaFajardo2315/prueba_tecnica_2.git
  cd prueba_tecnica_2
```
2. Instalar dependencias
```bash
  npm install
```
3. Configurar variables de entorno
Crear un archivo .env e incluir los siguientes datos:
```bash
BD_PASSWORD = ruletaCASINO
BD_URL = mongodb+srv://danielafajardo2315_db_user:ruletaCASINO@ruletacasino.q5efyqp.mongodb.net/?appName=ruletaCasino
PORT = 3000
```
4. Ejecutar el servidor
```bash
  npm run dev
```
## Modelos de datos

Los principales modelos utilizados para la persistencia son:

- Ruleta (roulette): Contiene campos como número, color, estado, fecha de creación y fecha de cierre.

- Apuestas (bet): Contiene campos como ID de la ruleta, monto de la apuesta, tipo de apuesta (número o color), valor de la apuesta (número o color a apostar), ganancias, estado (pendiente, ganada o perdida) y fecha de la apuesta.
## Authors

Proyecto creado por:
- [@DanielaFajardo2315](https://github.com/DanielaFajardo2315)