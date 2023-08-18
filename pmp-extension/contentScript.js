console.log(`PMP Extension is now available!`);

const setCredentials = (elementId, value) => {
  const element = document.getElementById(elementId);
  if (element) element.value = value;
};

setCredentials('username', 'b.hristozov');
setCredentials('password', 'Hr@Bo-Po!759');
