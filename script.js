let balance = 5000;

let coins = [
  {name:"BTC", price:100},
  {name:"ETH", price:80},
  {name:"charlie kirk", price:67420}
];

function updateUI() {
  document.getElementById("balance").innerText = balance.toFixed(2);
  let container = document.getElementById("coins");
  container.innerHTML = "";

  coins.forEach((coin, index) => {
    let trend = coin.lastChange || "Stable";

    container.innerHTML += `
      <div class="card">
        <h3>${coin.name}</h3>
        <p>Price: $${coin.price.toFixed(2)}</p>

        <select>
          <option>${trend}</option>
        </select>

        <br>
        <button onclick="buy(${index})">Buy</button>
        <button onclick="sell(${index})">Sell</button>
      </div>
    `;
  });
}

function buy(i) {
  if(balance >= coins[i].price) {
    balance -= coins[i].price;
  }
  updateUI();
}

function sell(i) {
  balance += coins[i].price;
  updateUI();
}

function createCoin() {
  let name = document.getElementById("newCoinName").value;
  if(balance >= 1100 && name) {
    balance -= 1100;
    coins.push({name:name.toUpperCase(), price:50});
  }
  updateUI();
}

function randomUpdate() {
  coins.forEach(coin => {
    let chance = Math.random();

    if(chance < 0.02) {
      coin.price *= 0.1;
      coin.lastChange = "RUGPULL 💀";
    } else {
      let change = (Math.random() - 0.5) * 5;
      coin.price += change;

      coin.lastChange = change > 0 ? "Up 📈" : "Down 📉";
      if(coin.price < 1) coin.price = 1;
    }
  });

  if(Math.random() < 0.05) {
    coins.push({
      name: "COIN" + Math.floor(Math.random()*1000),
      price: Math.random()*100
    });
  }

  if(coins.length > 2 && Math.random() < 0.03) {
    coins.splice(Math.floor(Math.random()*coins.length), 1);
  }

  updateUI();
}

setInterval(randomUpdate, 2000);
updateUI();
