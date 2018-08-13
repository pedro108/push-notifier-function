module.exports = {
  "$id": "http://schema.mongeralaegon.com.br/send-notification.js",
  "type": "object",
  "properties": {
    "title": {
      "$id": "/properties/title",
      "type": "string",
      "title": "O título da notificação",
      "default": "",
      "examples": [
        "Teste push pela azure"
      ]
    },
    "message": {
      "$id": "/properties/message",
      "type": "string",
      "title": "O corpo da mensagem da notificação",
      "default": "",
      "examples": [
        "Teste de push notification sendo gerado por azure function, consumindo a API do OneSignal"
      ]
    },
    "deviceIds": {
      "$id": "/properties/deviceIds",
      "type": "array",
      "items": {
        "$id": "/properties/deviceIds/items",
        "type": "string",
        "title": "Lista de ids de dispositivos do usuário",
        "description": "Cada id identifica um dispositivo de um usuário específico para onde a mensagem será enviada. Caso esse campo não seja especificado, a notificação será enviada para todos os usuários.",
        "default": "",
        "examples": [
          "b5c85b7c-fdf0-4f81-9e3b-755511c42f29"
        ]
      }
    },
    "link": {
      "$id": "/properties/link",
      "type": "string",
      "title": "O link da notificação",
      "description": "O link para onde o usuário será direcionado ao clicar na notificação. Por default ele é direcionado para o Venda Digital.",
      "default": "",
      "examples": [
        "http://digital.mongeralaegon.com.br"
      ]
    }
  },
  "required": [
    "title",
    "message"
  ]
};
