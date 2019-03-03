<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Arvo');

body, html {
  width: 100%;
  background: url('./assets/background2.jpg') repeat local top left;
  background-size: 100% auto;

  font-family: 'Arvo', serif;
  color: rgba(0, 0, 0, 0.8)
}

#app {
  padding: 0 30px;
}

form {
	display: flex;
    flex-direction: column;
    background-color: green;

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
    .form-group {
      margin: 4px;
    }
}

.btn {
	border: none;
	border-radius: 2px;
	padding: 5px;
	cursor: pointer;
	
 	&.primary {
		background-color: rgba(50, 50, 50, 0.7);
		color: white;
		margin: 10px;
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

input[type=checkbox] + label {
    display: block;
    margin: 0.2em;
    cursor: pointer;
    padding: 0.2em;
    user-select: none;
}

input[type=checkbox] {
    display: none;
}

input[type=checkbox] + label:before {
    content: "\2714";
    border: 1px solid transparent;
    border-radius: 0.2em;
    width: 1em;
    display: inline-block;
    height: 1em;
    padding-left: 0.2em;
    padding-bottom: 0.3em;
    margin-right: 0.5em;
    vertical-align: bottom;
    color: transparent;
    transition: .2s;
    background-image: radial-gradient(#cbcfcb 60%, #5f635d);

}

input[type=checkbox] + label:active:before {
    transform: scale(0);
}

input[type=checkbox]:checked +label:before {
    background-image: radial-gradient(#cbcfcb 60%, #5f635d);
    border: 1px solid transparent;
    color: #b5863a;
}

input[type=checkbox]:disabled + label:before {
    transform: scale(1);
    border-color: #aaa;
}

input[type=checkbox]:checked:disabled + label:before {
    transform: scale(1);
    background-color: #bfb;
    border-collapse: #bfb;
}

input[type=text] {
    background-color: transparent;
    border: 2px solid;
    border-color: rgba(40, 40, 40, 0.4);
    width: 70%;
}

.form-group {
    display: flex;
    background-color: red;
}
</style>
