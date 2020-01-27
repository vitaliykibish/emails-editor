# ✉️ Welcome to EmailsEditor!
#### Simple lib for creating emails list and render it to the DOM. 

## Getting Started:

Add the following script on your HTML:
```html
<head>
  <script src="emails-editor.js"></script> 
</head>
```

Now, create the editor:
```html
<body>
  <div id="emails-editor"></div>
  <script>
      const placeholder = 'type email...'
      const container = document.getElementById('emails-editor')
      const emailsEditor = EmailsEditor({ container, placeholder })

      // some code to control emails via library
  </script>
</body>
```

## API

**.setEmails(emails{array|string})**
```javascript
emailsEditor.setEmails(['email1@dom.com', 'email2@dom.com'])
// or
emailsEditor.setEmails('email1@dom.com')
```

**.getEmails()**
```javascript
emailsEditor.setEmails(['email1@dom.com', 'email2@dom.com'])

const emails = emailsEditor.getEmails()

console.log(emails) // output: ['email1@dom.com', 'email2@dom.com']
```

**.subscribe(callback{function})**
```javascript
const callback = (emails) => {
  console.log(emails) // output: ['email1@dom.com', 'email2@dom.com']
}

const emails = emailsEditor.subscribe(callback)
emailsEditor.setEmails(['email1@dom.com', 'email2@dom.com'])
```

**.unsubscribe(callback{function})** 

## Live demo
Test it at [GitHub Pages](https://vitaliykibish.github.io/emails-editor 'GitHub Pages')

## Development

### Build system (Webpack)

Install all dependencies:
```
npm install
```

Run dev server:
```
npm start
```

Create production bundle:
```
npm run build
```

### Automated tests (Jest)

Run all tests at once:
```
npm test
```

