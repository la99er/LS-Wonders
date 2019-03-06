<template>
  <div id="app">
    <img alt="Vue logo" class="header-img" src="@/assets/logo.png">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Arvo");

body,
html {
  width: 100%;
  background: url("./assets/background2.jpg") repeat local top left;
  background-size: 100% auto;

  font-family: "Arvo", serif;
  color: rgba(50, 50, 50, 1);
}

#app {
  padding: 0 30px;
  align-items: center;

  .header-img {
    display: block;
    width: 80%;
    max-width: 500px;
    margin: 0 auto;
  }

  .container {
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
  }
}

form {
  margin-top: 10px;

  .btn {
    align-self: center;
  }

  h2 {
    margin: 4px;
  }
  hr {
    border: 0;
    border-top: 3px double #ccc;
    width: 90%;
  }

  button {
    display: block;
    margin: 0px auto;
  }

  .form-group {
    margin: 4px;
  }

  .form-line {
    margin-bottom: 8px;

    label {
      display: inline-block;
      text-align: center;
      width: 100px;
    }
    
    input[type=text] {
      display: inline-block;
      background: transparent;
      border: 2px solid;
      border-color: rgba(40, 40, 40, 0.4);
    }

    input[type="number"] {
      width: 50px;
    }
  }
}

.btn {
  border: none;
  border-radius: 2px;
  text-align: center;
  cursor: pointer;

  &.primary {
    background-color: rgba(50, 50, 50, 0.7);
    color: white;
    margin: 10px;
    padding: 8px;
    min-width: 100px;
  }

  &.delete {
    background: transparent;
    color: rgba(0, 0, 0, 0.8);
    font-weight: bold;
    border-radius: 2px;
    position: relative;
    width: 20px;
    right: 24px;
  }
}

a.btn {
  text-decoration: none;
}

input[type="checkbox"] + label {
  display: block;
  margin: 8px;
  cursor: pointer;
  padding: 4px;
  user-select: none;
}

// Hide the original checkbox
input[type="checkbox"] {
  display: none;
}

// Display the new checkbox infront of the label
input[type="checkbox"] + label:before {
  content: "\2714";
  border: 1px solid transparent;
  border-radius: 50%;
  display: inline-block;
  width: 1em;
  height: 1em;
  padding-left: 4px;
  padding-bottom: 4px;
  margin-right: 8px;
  color: transparent;  // Hide if not checked
  transition: 0.2s;
  background-image: radial-gradient(#cbcfcb 50%, #5f635d);
}

// Animate on clicking
input[type="checkbox"] + label:active:before {
  transform: scale(0);
}

// If checkbox is checked
input[type="checkbox"]:checked + label:before {
  color: #b5863a;  // Show the font
}

</style>
