## project-node-gemini

Foi desenvolvido o back-end de um serviço que gerencia a leitura individualizada de
consumo de água e gás. Para facilitar a coleta da informação, o serviço utilizará IA para
obter a medição através da foto de um medidor.

## Endpoints

## POST

**Responsável por receber uma imagem em base 64, consultar o Gemini e retornar a medida lida pela API**

**POST /upload - FORMATO DA REQUISIÇÃO**

```javascript
{
"image": "base64",
"customer_code": "string",
"measure_datetime": "datetime",
"measure_type": "WATER" ou "GAS"
}
```

**POST /upload - FORMATO DA RESPOSTA - STATUS 200 - OK**

```javascript
{
"image_url": string,
"measure_value":integer,
"measure_uuid": string
}
```

## POST - ERROR

**POST /upload - FORMATO DA RESPOSTA - STATUS 400 - BAD REQUEST**

**Validar o tipo de dados dos parâmetros enviados (inclusive o base64)**

```javascript
{
"error_code": "INVALID_DATA",
"error_description": <descrição do erro>
}
```

**POST /upload - FORMATO DA RESPOSTA - STATUS 409 - CONFLICT**

**Verificar se já existe uma leitura no mês naquele tipo de leitura**

```javascript
{
"error_code": "DOUBLE_REPORT",
"error_description": "Leitura do mês já realizada"
}
```

## PATCH

**Responsável por confirmar ou corrigir o valor lido pelo LLM**

**PATCH /confirm - FORMATO DA REQUISIÇÃO**

```javascript
{
"measure_uuid": "string",
"confirmed_value": integer
}
```

**PATCH /confirm - FORMATO DA RESPOSTA - STATUS 200 - OK**

```javascript
{
"success": true
}
```

## PATCH - ERROR

**PATCH /confirm - FORMATO DA RESPOSTA - STATUS 400 - BAD REQUEST**

**Validar o tipo de dados dos parâmetros enviados**

```javascript
{
"error_code": "INVALID_DATA",
"error_description": <descrição do erro>
}
```

**PATCH /confirm - FORMATO DA RESPOSTA - STATUS 404 - NOT FOUND**

**Verificar se o código de leitura informado existe**

```javascript
{
"error_code": "MEASURE_NOT_FOUND",
"error_description": "Nenhuma leitura encontrada"
}
```

**PATCH /confirm - FORMATO DA RESPOSTA - STATUS 409 - CONFLICT**

**Verificar se o código de leitura já foi confirmado**

```javascript
{
"error_code": "CONFIRMATION_DUPLICATE",
"error_description": "Leitura do mês já realizada"
}
```

## GET

**Responsável por listar as medidas realizadas por um determinado cliente**

**GET /<customer_code>/list - FORMATO DA RESPOSTA - STATUS 200 - OK**

_Rota pode receber um query parameter “measure_type”, que deve ser ***WATER*** ou ***GAS***_

```javascript
{
"customer_code": string,
"measures": [
    {
    "measure_uuid": string,
    "measure_datetime": datetime,
    "measure_type": string,
    "has_confirmed":boolean,
    "image_url": string
    },
    {
    "measure_uuid": string,
    "measure_datetime": datetime,
    "measure_type": string,
    "has_confirmed":boolean,
    "image_url": string
    }
  ]
}
```

## GET - ERROR

**GET /<customer_code>/list - FORMATO DA RESPOSTA - STATUS 400 - BAD REQUEST**

**Validar o tipo de dado da query parâmetro “measure_type”, que deve ser “WATER” ou “GAS”. A validação deve ser CASE INSENSITIVE**

```javascript
{
"error_code": "INVALID_TYPE",
"error_description": "Tipo de medição não permitida"
}
```

**GET /<customer_code>/list - FORMATO DA RESPOSTA - STATUS 404 - NOT FOUND**

**Verificar se o código do cliente e medidas informadas existe**

```javascript
{
"error_code": "MEASURES_NOT_FOUND",
"error_description": "Nenhuma leitura encontrada"
}
```
