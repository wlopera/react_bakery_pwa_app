# react_bakery_pwa_app
React Fórmula Panadera -PWA - Bootstrap

# REQUIERE: PROYECTO DE NODE-JS LENTADO
  > https://github.com/wlopera/node-bakery-formula 
```
-----------------------------------------------------------------------------------------
Crear proyecto:
-----------------------------------------------------------------------------------------
    > npx create-react-app react_bakery_pwa_app --template cra-template-pwa
-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------
Dependencias:
-----------------------------------------------------------------------------------------
  - CND:
   -> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
   -> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  
 -----------------------------------------------------------------------------------------
  - Crear carpetas:
    - assets
    - components
    - services
    - store
-----------------------------------------------------------------------------------------
Customizar colores de bootstrap:
-----------------------------------------------------------------------------------------
  - D:\WorkSpace\WS_PERSONAL_PROGRAMS\react_bakery_pwa_app\src\custom.scss
        /* custom.scss */
        $theme-colors: ("primary": #dcdcdc,
            "secondary": #198754,
            "custom-primary": #dcdcdc,
            "custom-secondary": #01bc45,
            "custom-success": #C00000,
            "custom-info": #86e5f4,
            "custom-warning": #c8e6fc,
            "custom-danger": #E3E3E3,
            "custom-light": #F0F0F0,
            "custom-dark": #000809,
            "custom-white": #ffffff,
        );
        $border-radius: 10rem;

        @import 'bootstrap/scss/bootstrap';

    - D:\WorkSpace\WS_PERSONAL_PROGRAMS\react_bakery_pwa_app\src\index.js
        import "./custom.scss";
-----------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------
Conectar React con NodeJS: Localmente
-----------------------------------------------------------------------------------------
   - D:\WorkSpace\WS_PERSONAL_PROGRAMS\react_bakery_pwa_app\public\runtime-config.js
      window["runConfig"] = {
        BACKEND_URL: "http://localhost:8585/api",
      };

  - D:\WorkSpace\WS_PERSONAL_PROGRAMS\react_bakery_pwa_app\public\index.html
      <script src="%PUBLIC_URL%/runtime-config.js"></script>
      
-----------------------------------------------------------------------------------------
```

## Ajuste de estilos WEB - PWA
![Captura222-a](https://user-images.githubusercontent.com/7141537/177217574-c864623e-0e05-4d66-8d5b-39db1786bd2e.PNG)
![Captura222-2](https://user-images.githubusercontent.com/7141537/177217582-1eaf7dda-708d-4c0e-85d4-55d4574aee1c.PNG)
![Captura222-33](https://user-images.githubusercontent.com/7141537/177217570-2eb9cd4e-b396-4a99-9cca-2c77cb9b9d46.PNG)

## Ajuste de estilos Mobile - PWA
![Captura](https://user-images.githubusercontent.com/7141537/177217579-4cb9c473-4479-4c3a-8af6-7eaa02c94105.PNG)
![Captura1](https://user-images.githubusercontent.com/7141537/177217580-5068a374-2d27-40b9-880d-a0b2bb97c768.PNG)
![Captura222](https://user-images.githubusercontent.com/7141537/177217581-41ea3860-6332-4054-9a75-2c36676e37fc.PNG)

## Validar si se puede agregar ingredientes (botón aceptar)
![CapturaAA](https://user-images.githubusercontent.com/7141537/177217576-70e598e0-9688-4843-85c6-d3f3025e3257.PNG)

## Conexion con NodeJS - MongoDB
```
 - D:\WorkSpace\WS_PERSONAL_PROGRAMS\react_bakery_pwa_app\src\services\axios\http-common.js
        import axios from "axios";
        const { BACKEND_URL } = window["runConfig"];

        const instance = axios.create({
          baseURL: BACKEND_URL,
          headers: {
            "Content-type": "application/json",
          },
        });
        
  - D:\WorkSpace\WS_PERSONAL_PROGRAMS\react_bakery_pwa_app\src\services\ingredient.service.js
            import http from "./axios/http-common";
            class IngredientDataService {
              get() {
                return http.get("/ingredients");
              }
              create(data) {
                return http.post("/ingredients", data);
              }
              update(id, data) {
                return http.put("/ingredients/" + id, data);
              }
              delete(id) {
                return http.delete("/ingredients/" + id);
              }
            }
            export default new IngredientDataService();
            export default instance;
```
## Agregar, modificar o eliminar ingredientes 
![Capturaa](https://user-images.githubusercontent.com/7141537/177811612-bb1c2d70-48ab-4a7a-a8fa-12a899519a9c.PNG)
![Captura](https://user-images.githubusercontent.com/7141537/177811613-c484b368-6273-49c3-b829-0c091e46f015.PNG)
![Captura1](https://user-images.githubusercontent.com/7141537/177811609-ed90fdb7-94dd-4d14-b896-0ffd06de3bb6.PNG)

## Configurar para buscar nodeJS en la web
  - D:\WorkSpace\WS_PERSONAL_PROGRAMS\react_bakery_pwa_app\public\runtime-config.js
  ```
  window["runConfig"] = {
  //BACKEND_URL: "http://localhost:8585/api", //Desarrollo
  BACKEND_URL: "https://node-bakery-formula.herokuapp.com/api", // Produccion
};

  ```
