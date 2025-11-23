SMART RESTAURANT
============================

Descripción general
-------------------
Smart Restaurant es una plataforma moderna diseñada para optimizar la operación de un restaurante mediante la integración de:
- Gestión de pedidos en tiempo real (RTDB + Firestore).
- Roles diferenciados: Cliente, Mesero y Cocinero.
- Autenticación con Firebase (Google Auth y usuarios anónimos).
- Comunicación por mensajería interna entre clientes, meseros y cocina.
- Actualización automática de estados de pedidos.
- Dashboard administrativo con estadísticas.

El proyecto está desarrollado con:
- React + Vite
- Redux Toolkit
- Firebase Auth
- Firebase Firestore
- Firebase Realtime Database
- Netlify Functions
- SCSS Modules

Funciones destacadas
--------------------
1. Gestión de pedidos en tiempo real
    - Creación, actualización y seguimiento de estados.
    - Comunicación entre roles.
    - Sincronización automática de cambios.

2. Roles y accesos
    - Cliente: menú, carrito, pedidos y chat.
    - Mesero: gestión de mesas, pedidos y mensajes.
    - Cocinero: cola de cocina y cambios de estado.
    - Administrador: estadísticas en tiempo real.

3. Función programada (Netlify)
    - Limpieza diaria de usuarios anónimos (Auth + Firestore).
    - Ejecución automática a las 12:00 a.m. (hora Colombia).
    - Ejecución manual disponible.

Deploy en Netlify
-----------------
El proyecto incluye un archivo netlify.toml configurado para:
- Build con Vite
- SPA redirect
- Serverless functions
- Cron diario para limpieza

Variables de entorno necesarias
-------------------------------
VITE_FIREBASE_API_KEY  
VITE_FIREBASE_AUTH_DOMAIN  
VITE_FIREBASE_PROJECT_ID  
VITE_FIREBASE_STORAGE_BUCKET  
VITE_FIREBASE_MESSAGING_SENDER_ID  
VITE_FIREBASE_APP_ID  
VITE_FIREBASE_APP_MEASUREMENT_ID  
VITE_FIREBASE_DATABASE_URL  
FIREBASE_SERVICE_ACCOUNT_JSON

Instalación y ejecución local
-----------------------------
npm install  
npm run dev  
netlify dev (para pruebas de funciones)  
npm run build

Autores
-------
- Jorge Andrés Medina Urrutia
- Mauriel Rodriguez Ospina
- Juan Sebastian Castillo Acevedo
