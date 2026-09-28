/* ============================================================
   MODULE-DATA.JS
   Fuente única de contenido para los 12 módulos del sitio
   (6 de contabilidad + 6 de finanzas personales).

   Se carga en: modulos.html, test.html y modulo.html

   NOTA PARA DESARROLLO FUTURO:
   Este archivo simula lo que en producción sería una respuesta de
   API (ej. GET /api/modulos). Cuando exista backend, basta con
   reemplazar `window.FINOVA_MODULES` por el resultado de un fetch()
   que devuelva objetos con esta misma forma — el resto del código
   (modulo.js, cards-progress.js) no necesita cambiar.

   Estructura de cada módulo:
   {
     id: string único (usado en la URL modulo.html?id=...)
     code: string mostrada en la pestaña de la tarjeta (ej. "MOD-01")
     category: "contabilidad" | "finanzas"
     level: "basico" | "intermedio" | "avanzado" | "practico"
     title, summary: textos de la tarjeta
     icon: contenido interno de un <svg> (mismo ícono en tarjeta y módulo)
     theory: [{ heading, body }]   — bloques de teoría corta
     activities: [{ id, type, prompt, ... }] — ver tipos abajo:
       type "mcq"       -> options: string[], correctIndex: number
       type "truefalse" -> correct: boolean
       type "numeric"   -> correctValue: number, unit?: string, tolerance?: number
       Todas llevan: explanation (se muestra tras responder)
   }
   ============================================================ */

window.FINOVA_MODULES = [

  /* ============================ CONTABILIDAD ============================ */

  {
    id: "asientos",
    code: "MOD-01",
    category: "contabilidad",
    level: "basico",
    title: "Asientos Contables y Partida Doble",
    summary: "Aprende a registrar cada operación aplicando el principio de que todo débito tiene su crédito.",
    icon: '<path d="M12 2l9 4.5-9 4.5-9-4.5L12 2z"/><path d="M3 6.5v11L12 22l9-4.5v-11"/><path d="M12 11v11"/>',
    theory: [
      {
        heading: "¿Qué es un asiento contable?",
        body: "Es el registro de una operación económica en el libro diario. Sigue el principio de partida doble: todo lo que entra por un lado (Debe) debe salir por otro (Haber), y los totales siempre deben quedar iguales."
      },
      {
        heading: "La partida doble",
        body: "Cada operación afecta como mínimo dos cuentas. Ejemplo: si compras mercancía y pagas en efectivo, aumenta el Inventario (Debe) y disminuye la Caja (Haber)."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "En un asiento contable, ¿en qué columna se registra un aumento de Caja?",
        options: ["Debe", "Haber", "En ninguna", "En ambas por igual"],
        correctIndex: 0,
        explanation: "Correcto. Los aumentos de Caja (un activo) se registran al Debe."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "El total del Debe siempre debe ser igual al total del Haber en un asiento.",
        correct: true,
        explanation: "Correcto. Si no cuadran, el asiento tiene un error y hay que revisarlo."
      },
      {
        id: "a3", type: "numeric",
        prompt: "Compras mercancía por $500.000 y pagas de contado. ¿Cuánto se registra al Debe de la cuenta Inventario?",
        correctValue: 500000, unit: "$",
        explanation: "Correcto. El Inventario aumenta por el valor total de la compra: $500.000."
      }
    ]
  },

  {
    id: "cuentas-t",
    code: "MOD-02",
    category: "contabilidad",
    level: "basico",
    title: "Cuentas T y Dinámica de Cuentas",
    summary: "Comprende cómo aumentan y disminuyen las cuentas de activo, pasivo y patrimonio.",
    icon: '<path d="M12 3v18M4 8h16"/><rect x="4" y="8" width="16" height="13"/>',
    theory: [
      {
        heading: "¿Qué es una cuenta T?",
        body: "Es una representación gráfica en forma de 'T' que muestra el Debe a la izquierda y el Haber a la derecha, útil para visualizar los movimientos de una cuenta."
      },
      {
        heading: "Dinámica de las cuentas",
        body: "Los Activos y Gastos aumentan por el Debe y disminuyen por el Haber. Los Pasivos, el Patrimonio y los Ingresos aumentan por el Haber y disminuyen por el Debe."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "¿En qué lado de la cuenta T aumenta una cuenta de Pasivo?",
        options: ["Debe", "Haber", "En ninguno"],
        correctIndex: 1,
        explanation: "Correcto. Los pasivos aumentan por el Haber."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "Las cuentas de Activo aumentan registrando al Haber.",
        correct: false,
        explanation: "Falso. Las cuentas de Activo aumentan al Debe, no al Haber."
      },
      {
        id: "a3", type: "numeric",
        prompt: "El Debe de la cuenta Caja suma $300.000 y el Haber suma $120.000. ¿Cuál es el saldo final?",
        correctValue: 180000, unit: "$",
        explanation: "Correcto. 300.000 − 120.000 = 180.000."
      }
    ]
  },

  {
    id: "balance",
    code: "MOD-03",
    category: "contabilidad",
    level: "intermedio",
    title: "Balance de Comprobación",
    summary: "Verifica que los saldos de todas las cuentas cuadren antes de cerrar el periodo.",
    icon: '<path d="M4 21V9l8-6 8 6v12"/><path d="M4 12h16"/><path d="M9 21v-6h6v6"/>',
    theory: [
      {
        heading: "¿Qué es?",
        body: "Es un documento que resume los saldos de Debe y Haber de todas las cuentas, para comprobar que la contabilidad está cuadrada antes de preparar los estados financieros."
      },
      {
        heading: "¿Para qué sirve?",
        body: "Permite detectar errores de registro: si el total del Debe no coincide con el total del Haber, algo se registró mal y hay que corregirlo."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "¿Qué debe cumplirse en un Balance de Comprobación correcto?",
        options: ["Total Debe = Total Haber", "Total Debe > Total Haber", "La diferencia no importa"],
        correctIndex: 0,
        explanation: "Correcto. Ambos totales deben ser exactamente iguales."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "El balance de comprobación reemplaza al balance general.",
        correct: false,
        explanation: "Falso. Son documentos distintos: el de comprobación es un paso previo de verificación."
      },
      {
        id: "a3", type: "numeric",
        prompt: "Si la suma de los Debe es $2.450.000, ¿cuánto debe sumar el Haber para que el balance cuadre?",
        correctValue: 2450000, unit: "$",
        explanation: "Correcto. Ambas columnas deben sumar exactamente lo mismo."
      }
    ]
  },

  {
    id: "kardex",
    code: "MOD-04",
    category: "contabilidad",
    level: "intermedio",
    title: "Control de Inventarios y Kárdex",
    summary: "Aplica los métodos PEPS y Promedio Ponderado para valorar mercancías.",
    icon: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
    theory: [
      {
        heading: "¿Qué es el Kárdex?",
        body: "Es una tarjeta que registra las entradas, salidas y saldos de cada producto en el inventario, para saber en todo momento cuánto hay y cuánto vale."
      },
      {
        heading: "PEPS y Promedio Ponderado",
        body: "PEPS (Primeras en Entrar, Primeras en Salir) saca primero lo que entró primero. El Promedio Ponderado recalcula el costo promedio de cada unidad después de cada compra."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "PEPS significa:",
        options: ["Primeras en Entrar, Primeras en Salir", "Precio Estimado Por Salida", "Producto En Proceso de Salida"],
        correctIndex: 0,
        explanation: "Correcto. Los primeros productos que ingresan son los primeros en salir del inventario."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "El costo promedio ponderado se recalcula después de cada nueva compra.",
        correct: true,
        explanation: "Correcto. Cada compra cambia el costo promedio de las unidades disponibles."
      },
      {
        id: "a3", type: "numeric",
        prompt: "Compras 10 unidades a $2.000 y luego 10 unidades a $3.000. ¿Cuál es el costo promedio ponderado por unidad?",
        correctValue: 2500, unit: "$",
        explanation: "Correcto. (10×2.000 + 10×3.000) / 20 = 2.500 por unidad."
      }
    ]
  },

  {
    id: "nomina",
    code: "MOD-05",
    category: "contabilidad",
    level: "avanzado",
    title: "Liquidación de Nómina y Prestaciones",
    summary: "Calcula salarios, prestaciones sociales y aportes de seguridad social.",
    icon: '<circle cx="9" cy="7" r="3.2"/><path d="M2.5 21c0-3.5 3-6.2 6.5-6.2s6.5 2.7 6.5 6.2"/><circle cx="18" cy="8" r="2.4"/><path d="M15.5 14.3c2.7.3 4.9 2.7 5 5.7"/>',
    theory: [
      {
        heading: "¿Qué es la nómina?",
        body: "Es el registro de los pagos de salarios, deducciones y aportes de cada trabajador dentro de una empresa, mes a mes."
      },
      {
        heading: "Prestaciones sociales",
        body: "Además del salario, en Colombia el trabajador tiene derecho a prima de servicios, cesantías, intereses de cesantías y vacaciones."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "¿Cuál de estas NO es una prestación social en Colombia?",
        options: ["Prima de servicios", "Cesantías", "IVA", "Vacaciones"],
        correctIndex: 2,
        explanation: "Correcto. El IVA es un impuesto al consumo, no una prestación laboral."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "Las cesantías equivalen aproximadamente a un mes de salario por cada año trabajado.",
        correct: true,
        explanation: "Correcto. Es un ahorro obligatorio pensado para momentos de desempleo."
      },
      {
        id: "a3", type: "numeric",
        prompt: "Un trabajador gana $1.200.000 mensuales. Si su prima de servicios equivale a medio salario mensual, ¿cuánto recibe de prima?",
        correctValue: 600000, unit: "$",
        explanation: "Correcto. 1.200.000 ÷ 2 = 600.000."
      }
    ]
  },

  {
    id: "siigo",
    code: "MOD-06",
    category: "contabilidad",
    level: "practico",
    title: "Manejo del Software Siigo Contable",
    summary: "Practica la parametrización y el registro de operaciones en un entorno real de software.",
    icon: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>',
    theory: [
      {
        heading: "¿Qué es Siigo?",
        body: "Es un software contable muy usado en Colombia para facturar, registrar comprobantes y generar reportes financieros de forma automática."
      },
      {
        heading: "Comprobantes",
        body: "Cada operación se ingresa como un comprobante (de egreso, de ingreso o de contabilidad) y el sistema genera el asiento contable automáticamente."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "En Siigo, ¿qué tipo de comprobante usarías para registrar el pago de una factura a un proveedor?",
        options: ["Comprobante de egreso", "Comprobante de ingreso", "Nota crédito"],
        correctIndex: 0,
        explanation: "Correcto. Un pago que sale de la empresa se registra con un comprobante de egreso."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "Siigo genera automáticamente el asiento contable a partir del comprobante ingresado.",
        correct: true,
        explanation: "Correcto. Por eso reduce errores comparado con un registro manual."
      },
      {
        id: "a3", type: "mcq",
        prompt: "¿Qué reporte muestra el estado de saldos de todas las cuentas en Siigo?",
        options: ["Balance de comprobación", "Factura de venta", "Recibo de caja"],
        correctIndex: 0,
        explanation: "Correcto. El balance de comprobación resume los saldos de todas las cuentas."
      }
    ]
  },

  /* ============================== FINANZAS =============================== */

  {
    id: "presupuesto",
    code: "EF-01",
    category: "finanzas",
    level: "basico",
    title: "Presupuesto Personal",
    summary: "Aprende a organizar tus ingresos y gastos para saber a dónde va cada peso de tu dinero.",
    icon: '<path d="M9 4h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M9 2h6v4H9z"/><path d="M9 13l2 2 4-4"/>',
    theory: [
      {
        heading: "¿Qué es un presupuesto?",
        body: "Es un plan que organiza cuánto dinero entra y cuánto puedes gastar en cada categoría durante el mes, antes de que el dinero se te vaya sin darte cuenta."
      },
      {
        heading: "La regla 50/30/20",
        body: "Una guía sencilla: 50% para necesidades, 30% para gustos y 20% para ahorro. No es una regla fija, pero es un buen punto de partida."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "Según la regla 50/30/20, ¿qué porcentaje de tus ingresos deberías destinar al ahorro?",
        options: ["10%", "20%", "30%", "50%"],
        correctIndex: 1,
        explanation: "Correcto. El 20% sugerido va destinado al ahorro."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "Un presupuesto solo sirve para negocios, no para personas.",
        correct: false,
        explanation: "Falso. Cualquier persona puede (y debería) hacer su propio presupuesto."
      },
      {
        id: "a3", type: "numeric",
        prompt: "Si ganas $400.000 al mes y sigues la regla 50/30/20, ¿cuánto deberías ahorrar?",
        correctValue: 80000, unit: "$",
        explanation: "Correcto. El 20% de 400.000 es 80.000."
      }
    ]
  },

  {
    id: "ahorro",
    code: "EF-02",
    category: "finanzas",
    level: "basico",
    title: "Ahorro Inteligente",
    summary: "Descubre técnicas sencillas para ahorrar sin sacrificar todo lo que te gusta hacer.",
    icon: '<ellipse cx="12" cy="13" rx="8" ry="6"/><path d="M12 7V4M9 5l1 2M15 5l-1 2"/><circle cx="16" cy="12" r="1"/><path d="M4 14v3M20 14v3"/>',
    theory: [
      {
        heading: "¿Por qué ahorrar?",
        body: "El ahorro te da un respaldo ante imprevistos y te acerca a tus metas, desde algo pequeño hasta un proyecto grande a futuro."
      },
      {
        heading: "Cómo empezar",
        body: "Separa el ahorro apenas recibas el dinero, no esperes a ver 'qué sobra' al final del mes: casi siempre no sobra nada."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "¿Cuál es la mejor estrategia de ahorro?",
        options: ["Ahorrar lo que sobra al final del mes", "Separar el ahorro apenas recibes el dinero", "No ahorrar hasta ganar más", "Gastar todo y pedir prestado si falta"],
        correctIndex: 1,
        explanation: "Correcto. Ahorrar primero asegura que realmente lo hagas."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "Tener un fondo de emergencia es parte de un buen hábito de ahorro.",
        correct: true,
        explanation: "Correcto. Te protege ante imprevistos sin tener que endeudarte."
      },
      {
        id: "a3", type: "numeric",
        prompt: "Si ahorras $20.000 cada semana, ¿cuánto habrás ahorrado en 4 semanas?",
        correctValue: 80000, unit: "$",
        explanation: "Correcto. 20.000 × 4 = 80.000."
      }
    ]
  },

  {
    id: "tarjetas",
    code: "EF-03",
    category: "finanzas",
    level: "intermedio",
    title: "Tarjetas de Crédito y Deudas",
    summary: "Entiende cómo funcionan las tarjetas de crédito y cómo evitar caer en deudas difíciles de pagar.",
    icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/>',
    theory: [
      {
        heading: "¿Qué es una tarjeta de crédito?",
        body: "Te permite comprar hoy y pagar después, pero si no pagas el total de la factura, el saldo restante genera intereses."
      },
      {
        heading: "El pago mínimo",
        body: "Pagar solo el 'mínimo' hace que la deuda siga generando intereses mes a mes, por lo que terminas pagando mucho más de lo que compraste."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "Si solo pagas el mínimo de tu tarjeta, ¿qué pasa con el resto de la deuda?",
        options: ["Desaparece automáticamente", "Sigue generando intereses", "Se congela sin ningún costo"],
        correctIndex: 1,
        explanation: "Correcto. El saldo no pagado sigue generando intereses cada mes."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "Usar la tarjeta de crédito sin un plan de pago puede generar deudas difíciles de pagar.",
        correct: true,
        explanation: "Correcto. Por eso es clave planear cuánto y cuándo vas a pagar."
      },
      {
        id: "a3", type: "mcq",
        prompt: "¿Cuál es una buena práctica al usar una tarjeta de crédito?",
        options: ["Pagar el total de la factura cada mes", "Sacar siempre el máximo disponible", "Ignorar la fecha límite de pago"],
        correctIndex: 0,
        explanation: "Correcto. Pagar el total evita que se generen intereses."
      }
    ]
  },

  {
    id: "interes",
    code: "EF-04",
    category: "finanzas",
    level: "intermedio",
    title: "Interés y Cálculos Financieros",
    summary: "Aprende qué es el interés simple y compuesto, y por qué cambia tanto según cómo lo uses.",
    icon: '<rect x="5" y="3" width="14" height="18" rx="2"/><rect x="8" y="6" width="8" height="3"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01"/>',
    theory: [
      {
        heading: "Interés simple",
        body: "Se calcula únicamente sobre el monto inicial (capital), sin importar cuánto tiempo pase ni los intereses ya generados."
      },
      {
        heading: "Interés compuesto",
        body: "Se calcula también sobre los intereses ya generados antes, por eso tu dinero (o tu deuda) crece más rápido con el paso del tiempo."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "¿Qué tipo de interés crece más rápido con el tiempo?",
        options: ["Interés simple", "Interés compuesto", "Ambos crecen igual"],
        correctIndex: 1,
        explanation: "Correcto. El interés compuesto se acumula también sobre los intereses anteriores."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "El interés compuesto se calcula solo sobre el capital inicial.",
        correct: false,
        explanation: "Falso. Esa es la definición del interés simple, no del compuesto."
      },
      {
        id: "a3", type: "numeric",
        prompt: "Prestas $100.000 al 10% de interés simple anual. ¿Cuánto interés generará en un año?",
        correctValue: 10000, unit: "$",
        explanation: "Correcto. 100.000 × 10% = 10.000."
      }
    ]
  },

  {
    id: "impuestos",
    code: "EF-05",
    category: "finanzas",
    level: "avanzado",
    title: "Impuestos Básicos",
    summary: "Una introducción sencilla a qué son los impuestos y por qué existen, sin tecnicismos.",
    icon: '<path d="M7 3h10v18l-2-1-2 1-2-1-2 1-2-1V3z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
    theory: [
      {
        heading: "¿Qué son los impuestos?",
        body: "Son pagos obligatorios al Estado que financian servicios públicos como salud, educación, vías y seguridad."
      },
      {
        heading: "El IVA",
        body: "Es un impuesto al consumo que se paga al comprar la mayoría de productos y servicios, y ya viene incluido en el precio final."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "¿Para qué se usan los impuestos que paga la ciudadanía?",
        options: ["Para financiar servicios públicos", "Solo para pagar sueldos del gobierno", "No tienen ningún uso definido"],
        correctIndex: 0,
        explanation: "Correcto. Financian salud, educación, vías y otros servicios públicos."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "El IVA se paga al comprar la mayoría de productos y servicios.",
        correct: true,
        explanation: "Correcto. Está incluido en el precio final de casi todo lo que compras."
      },
      {
        id: "a3", type: "numeric",
        prompt: "Un producto cuesta $100.000 más 19% de IVA. ¿Cuánto pagarás de IVA?",
        correctValue: 19000, unit: "$",
        explanation: "Correcto. 100.000 × 19% = 19.000."
      }
    ]
  },

  {
    id: "prestamos",
    code: "EF-06",
    category: "finanzas",
    level: "practico",
    title: "Acuerdos y Préstamos Responsables",
    summary: "Casos prácticos para reconocer un buen o mal acuerdo financiero antes de firmarlo.",
    icon: '<path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z"/><path d="M9 12l2 2 4-4"/>',
    theory: [
      {
        heading: "Antes de firmar",
        body: "Lee siempre las condiciones completas: la tasa de interés, los plazos de pago y qué pasa si te atrasas, antes de aceptar un préstamo o acuerdo."
      },
      {
        heading: "Señales de alerta",
        body: "Promesas de 'dinero fácil', presión para firmar rápido o tasas de interés muy altas son señales de que algo no está bien."
      }
    ],
    activities: [
      {
        id: "a1", type: "mcq",
        prompt: "¿Qué deberías revisar siempre antes de firmar un préstamo?",
        options: ["Solo el monto que te entregan", "La tasa de interés y los plazos de pago", "Nada, basta con confiar"],
        correctIndex: 1,
        explanation: "Correcto. Esas condiciones determinan cuánto terminarás pagando en total."
      },
      {
        id: "a2", type: "truefalse",
        prompt: "La presión para firmar rápido es una señal de alerta en un acuerdo financiero.",
        correct: true,
        explanation: "Correcto. Un buen acuerdo te da tiempo suficiente para leer y decidir con calma."
      },
      {
        id: "a3", type: "mcq",
        prompt: "Una tasa de interés muy alta frente al mercado suele ser señal de...",
        options: ["Un buen negocio para ti", "Un posible riesgo o abuso", "Que no debes preocuparte"],
        correctIndex: 1,
        explanation: "Correcto. Cuando algo parece demasiado bueno (o caro) para ser cierto, hay que revisarlo con cuidado."
      }
    ]
  }

];
