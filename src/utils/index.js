const reEmail = /^\S{1,}@\S{1,}\.\S{2,3}$/
const reComma = /,\s?/

export const validate = email => {
  return {
    value: email,
    valid: reEmail.test(email),
  }
}

export const splitStringByComma = (emailsStr = '') => {
  const emails = emailsStr.split(reComma).filter(email => email)

  return emails
}
