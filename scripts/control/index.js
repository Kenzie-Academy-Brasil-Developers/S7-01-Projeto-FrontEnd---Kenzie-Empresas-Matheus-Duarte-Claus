import { insertHeader , insertUserStatus  } from "./createUserPages.js";
import { insertDataOnPageAdmin } from "./createAdminPage.js";

let empresas = [
    {
      uuid: "9b53d868-42ac-4f05-92e6-4ad7c1166c39",
      name: "Skina Lanches",
      opening_hours: "09:00",
      description: "Podrão de qualidade",
      sectors: {
        uuid: "042cd7ac-c6fa-464b-88b3-51a2c3fb2e7c",
        description: "Alimenticio"
      }
    },
    {
      uuid: "5e46b8d2-92fb-42bd-8270-11dc4dd7d52c",
      name: "Gela Guela",
      opening_hours: "09:00",
      description: "Sorvetes barateza",
      sectors: {
        uuid: "042cd7ac-c6fa-464b-88b3-51a2c3fb2e7c",
        description: "Alimenticio"
      }
    },
    {
      uuid: "a0d7ef5d-9eaf-46fd-8f0b-4d0b309f9d9e",
      name: "Mercado Kenzie",
      opening_hours: "09:00",
      description: "Padrão de qualidade",
      sectors: {
        uuid: "f0fe33d7-b78b-47de-859f-f74ee08ced52",
        description: "Varejo"
      }
    },
    {
      uuid: "6a202eb2-4192-403c-84a1-ec5c8c9a8b3e",
      name: "Gortifruti da Terra",
      opening_hours: "09:00",
      description: "Natural e sem agrotóxicos",
      sectors: {
        uuid: "f0fe33d7-b78b-47de-859f-f74ee08ced52",
        description: "Varejo"
      }
    },
    {
      uuid: "c246cfc7-5eea-4341-8331-56b23eed01ea",
      name: "Tecidos Dona Florinda",
      opening_hours: "09:00",
      description: "Nossos tecidos são nossos tesouros",
      sectors: {
        uuid: "2fb07a07-c9f5-4427-b4e0-2330add177a9",
        description: "Textil"
      }
    },
    {
      uuid: "861178ff-7d56-46b1-bdd7-ef1cbebaa672",
      name: "Malhas Alberto",
      opening_hours: "09:00",
      description: "Compre suas roupas de academia aqui! melhor preço da região",
      sectors: {
        uuid: "2fb07a07-c9f5-4427-b4e0-2330add177a9",
        description: "Textil"
      }
    },
    {
      uuid: "cd7eac7c-fdf1-4ba3-9d24-5e7c49d0cde9",
      name: "DevModa",
      opening_hours: "09:00",
      description: "Roupas para um estilo de uma pessoa desenvolvedora",
      sectors: {
        uuid: "9b41ddcf-a4bd-4f48-a6c5-32f2abb3b3dc",
        description: "Manufatura"
      }
    },
    {
      uuid: "406ed701-5068-4502-9184-4e06f3c13f6d",
      name: "Edna Moda",
      opening_hours: "09:00",
      description: "Roupas de grifes, mas sem capas",
      sectors: {
        uuid: "9b41ddcf-a4bd-4f48-a6c5-32f2abb3b3dc",
        description: "Manufatura"
      }
    },
    {
      uuid: "a134a4da-95e0-478a-b0ac-eacd942f3ad7",
      name: "KenzieX",
      opening_hours: "09:00",
      description: "Levando nossos desenvolvedores a outro mundo",
      sectors: {
        uuid: "62de3b6f-bba4-4bc5-af6e-fb30b4356bf3",
        description: "Aeroespacial"
      }
    },
    {
      uuid: "d578cfa3-4294-42a9-a837-56806bc184e7",
      name: "Evolution Tech",
      opening_hours: "09:00",
      description: "Focamos nossos estudos e desenvolvimento em foguetes melhores e mais rapidos!!",
      sectors: {
        uuid: "62de3b6f-bba4-4bc5-af6e-fb30b4356bf3",
        description: "Aeroespacial"
      }
    },
    {
      uuid: "19f82d75-75c7-4f02-ad67-52b36fdabab7",
      name: "Boacharria",
      opening_hours: "09:00",
      description: "Se furar o pneu, conta comigo",
      sectors: {
        uuid: "980fc603-8915-41e0-9240-0c8c3b024c3d",
        description: "Automotiva"
      }
    },
    {
      uuid: "a530c0c2-418b-42b8-b6e2-066554a2892c",
      name: "Offcina",
      opening_hours: "09:00",
      description: "Arrumamos seu carro",
      sectors: {
        uuid: "980fc603-8915-41e0-9240-0c8c3b024c3d",
        description: "Automotiva"
      }
    },
    {
      uuid: "b11aae6d-3f9d-4b9b-a119-6a62e9a494f8",
      name: "Nerd lab",
      opening_hours: "09:00",
      description: "Criamos um site rapidão pra você",
      sectors: {
        uuid: "3854e74a-0a96-43dd-b44b-f884c08ff3a1",
        description: "TI"
      }
    },
    {
      uuid: "9cbc0470-f4e8-4579-ae9b-48ebce49073e",
      name: "Chipset manutenções",
      opening_hours: "09:00",
      description: "Arrumamos o PC",
      sectors: {
        uuid: "3854e74a-0a96-43dd-b44b-f884c08ff3a1",
        description: "TI"
      }
    },
    {
      uuid: "785d7f64-8ceb-4cab-a15e-10b6d42dbfca",
      name: "Mercado Popular",
      opening_hours: "09:00",
      description: "Melhor preço e qualidade!!",
      sectors: {
        uuid: "f38dad57-0f16-4bd5-86e5-c3a7706df623",
        description: "Atacado"
      }
    },
    {
      uuid: "dd99a2a5-9032-4dae-8da7-b3bf8c2c8d05",
      name: "Atacadão Kenzie",
      opening_hours: "09:00",
      description: "Liquidamos todas as ofertas!!",
      sectors: {
        uuid: "f38dad57-0f16-4bd5-86e5-c3a7706df623",
        description: "Atacado"
      }
    }
  ]

  let departamentos = [
    {
      uuid: "e66f05d9-6093-4e32-9f70-4bcc213e53a5",
      name: "TI",
      description: "Departamento de TI",
      companies: {
        uuid: "b11aae6d-3f9d-4b9b-a119-6a62e9a494f8",
        name: "Nerd lab",
        opening_hours: "09:00",
        description: "Criamos um site rapidão pra você",
        sector_uuid: "3854e74a-0a96-43dd-b44b-f884c08ff3a1"
      }
    },
    {
      uuid: "f34fb160-9ed4-456a-bebd-2209d3e49c3d",
      name: "RH",
      description: "Recrutamento e seleção",
      companies: {
        uuid: "b11aae6d-3f9d-4b9b-a119-6a62e9a494f8",
        name: "Nerd lab",
        opening_hours: "09:00",
        description: "Criamos um site rapidão pra você",
        sector_uuid: "3854e74a-0a96-43dd-b44b-f884c08ff3a1"
      }
    }
  ]

  let usuarios = [
    {
      uuid: "8da2c187-19fa-4835-8217-e292908ac30b",
      username: "ADMIN",
      email: "admin@mail.com",
      password: "$2a$08$1Cv4zo1vWTNQhNnCNsF4tuHKtVBdR5.zLm5kf0gANbO9rJiNdATcm",
      professional_level: "sênior",
      kind_of_work: "home office",
      is_admin: true,
      department_uuid: null
    },
    {
      uuid: "3485f5be-ea48-4beb-b5c9-cc2eb39c63bb",
      username: "Felipe",
      email: "felipe@mail.com",
      password: "$2a$08$HOxlY6BSmlwZuXA67fok2.PFpvmqiPNQG8VA0K7WatJEHK0G6aAku",
      professional_level: "júnior",
      kind_of_work: "home office",
      is_admin: false,
      department_uuid: null
    },
    {
      uuid: "3b7cb1f1-d237-4e20-a6b2-ddb869fe2a41",
      username: "Ruan",
      email: "ruan@mail.com",
      password: "$2a$08$DrlnFWLakU/BxdQc9Q4JvOURnw6XlbN5r9h4FVIRRQC8qT7HoNS9S",
      professional_level: "júnior",
      kind_of_work: "home office",
      is_admin: false,
      department_uuid: null
    },
    {
      uuid: "00d2d1dc-25c2-482a-bd72-941ff190132c",
      username: "Jorge",
      email: "jorge@mail.com",
      password: "$2a$08$VB5V5WQZXPjGMd1Fdrq5I.FdBFsTZxcLwDqZIR2ibDuP3mBjd0MeC",
      professional_level: "sênior",
      kind_of_work: "home office",
      is_admin: false,
      department_uuid: null
    },
    {
      uuid: "d27dc753-8336-4c23-91ae-d929f6f3c47e",
      username: "João",
      email: "joao@mail.com",
      password: "$2a$08$JV6DPjulwPCF3NI0sRfTX.lkEcbqv3eyDIAYHLVri4PvOGQ1LP6GG",
      professional_level: "pleno",
      kind_of_work: "home office",
      is_admin: false,
      department_uuid: null
    },
    {
      uuid: "3404c6d5-89b1-4f5e-9cd0-e089e19067f7",
      username: "Bruna",
      email: "bruna@mail.com",
      password: "$2a$08$4xZVtYsyl0yB49jLwPro2OjK773EHNyX9ssZw083hZEzvvMTUeal.",
      professional_level: "sênior",
      kind_of_work: "home office",
      is_admin: false,
      department_uuid: null
    },
    {
      uuid: "25f8cd41-3fbd-4aae-ac14-e2f3dd853dc8",
      username: "Ricardo",
      email: "ricardo@mail.com",
      password: "$2a$08$zSCdZRoQiEw.uKNIrvnyS.EdEnr84bGE0iMldfWzsMfVBtHbZYwcW",
      professional_level: "estágio",
      kind_of_work: "presencial",
      is_admin: false,
      department_uuid: null
    },
    {
      uuid: "b19da21e-3826-4549-b3f5-c61f32bc9849",
      username: "Joana",
      email: "joana@mail.com",
      password: "$2a$08$ToUZMjYpK6kWPOW8TVRqDe8eDTGVRlXVULp3uPrQ7ZHaWYV9EqhfK",
      professional_level: "júnior",
      kind_of_work: "hibrido",
      is_admin: false,
      department_uuid: null
    },
    {
      uuid: "5a202da4-f14b-4418-8ffd-a4c7ab3c1145",
      username: "Kenzinho M2",
      email: "kenzinhoM2@mail.com",
      password: "$2a$08$yx5vzr3JEu0N5NzKONTYFu1AQ1mqVeEUcUE5L1LlimFZ7NSQW5/ca",
      professional_level: "sênior",
      kind_of_work: null,
      is_admin: false,
      department_uuid: "e66f05d9-6093-4e32-9f70-4bcc213e53a5"
    }
  ]

  
insertDataOnPageAdmin(empresas, departamentos, usuarios, "Apple")