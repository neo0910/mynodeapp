db.createUser({
  user: 'myuser',
  pwd: 'mypassword',
  roles: [{
    role: 'readWrite',
    db: 'mynodeapp-db'
  }]
})
