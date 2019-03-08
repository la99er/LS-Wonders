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
  background: url("./assets/background2.jpg") no-repeat center center fixed;
  background-size: cover;

  font-family: "Arvo", serif;
  color: rgba(50, 50, 50, 1);
}

#app {
  align-items: center;

  .header-img {
    display: block;
    width: 80%;
    max-width: 500px;
    margin: 0 auto;
  }

  .container {
    margin: 0 auto;
    width: 90%;
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
    text-align: left;

    label {
      display: inline;
      text-align: right;
      margin-right: 12px;
	    overflow: hidden;
    }
    .label {
      display: inline-block;
      text-align: right;
      width: 40%;
    }
    .wrapper {
      display: inline-block;
      line-height: 2em;
      width: 40%;
      text-align: right;
    }
    input[type=text] {
      display: inline-block;
      background: transparent;
      border: 2px solid;
      border-color: rgba(40, 40, 40, 0.4);
    }

    input[type="number"] {
      display: inline-block;
      width: 20px;
      margin: 0 4px;
      line-height: 1.5em;
      -moz-appearance: textfield;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button
    {
      -webkit-appearance: none;
      margin: 0;
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
    margin: 20px auto;
    padding: 8px;
    min-width: 100px;
  }

  &.delete {
    display: inline-block;
    background: transparent;
    color: rgba(0, 0, 0, 0.8);
    font-weight: bold;
    border-radius: 2px;
    position: relative;
    line-height: 20px;
    width: 24px;
    right: 26px;
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
