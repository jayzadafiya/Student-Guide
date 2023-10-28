function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    
    if (username == "" && password == "") {
      alert("Username and password both cannot be empty");
      return false;
    }
    if (username == "") {
      alert("Username cannot be empty");
      return false;
    }
  
    if (/^\d/.test(username)) {
      alert("Username cannot start with a number");
      return false;
    }
  
    if (password == "") {
      alert("Password cannot be empty");
      return false;
    }
  
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return false;
    }
  
    return true;
  }

  
  function validate_signup() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var passwordConfirm = document.getElementById("password-confirm").value;
  
    // Check for a valid name
    if (!name || name.trim().length === 0) {
      alert("Please enter a valid name");
      return false;
    }
  
    // Check for a valid email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }
  
    // Check for a valid username
    if (!username || /^\d/.test(username)) {
      alert("Please enter a valid username that does not start with a numberhahahhahahahahaah");
      return false;
    }
  
    // Check for a valid password
    if (!password || password.length < 8) {
      alert("Please enter a valid password that is at least 8 characters long");
      return false;
    }
  
    // Check that the password and password confirmation match
    if (password !== passwordConfirm) {
      alert("The password and password confirmation do not match");
      return false;
    }
  
    // If all validations pass, return true to allow the form to be submitted
    return true;
  }
  