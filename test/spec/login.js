'use strict';



function isEmail_valid(email){
  var pattern =/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return pattern.test(email);
}

function isPassword_valid(password){
  var pattern =/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i;
  return pattern.test(password);
}

describe("Email and Password validation", function() {

  it("should validate info@knoldus.com",function(){
    var result = isEmail_valid("info@knoldus.com");
    expect(result).toBe(true);
  });

  it("should not validate info@knoldus",function(){
    var result = isEmail_valid("info@knoldus");
    expect(result).not.toBe(true);
  });

  it("should validate password",function(){
    var result = isPassword_valid("Password@123");
    expect(result).toBe(true);
  });

  it("should not validate password",function(){
    var result = isPassword_valid("password32");
    expect(result).not.toBe(true);
  });

});