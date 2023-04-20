

const form = document.createElement("form");


form.innerHTML = `<div class="rrForm">
<div class="rrHeader">
    <div class="rrName">RoninRoutine</div>
    <div class="rrItem">
        <p>Status:</p>
        <p class="rrItemStatus">test</p>
    </div>
</div>
<div class="rrMainBlock">
    <div class="rrInputRaw">
        <div class="rrInputBlock">
            <label for="buyprice">Buy Price*:</label>
            <input class="rrInput" type="number" id="buyprice" name="buyprice" required>
        </div>
        <div class="rrInputBlock">
            <label for="sellprice">Sell Price*:</label>
            <input class="rrInput" type="number" id="sellprice" name="sellprice" required>
        </div>
    </div>
    <br>
    <div class="rrInputRaw">
        <div class="rrInputBlock">
            <label for="amount">Amount:</label>
            <input class="rrInput" type="number" id="amount" name="amount">
        </div>
    </div>

</div>
<br>
<input class="rrSubmit" type="submit" value="Submit">
</div>

<style>
.rrForm {
    display: flex;
    flex-direction: column;
    background-color: #0f1620;
    color: #b450f1;
    padding: 10px 0 0 0;
    border: 1px solid black;
    font-size: 24px;
}

.rrHeader {
    display: flex;
    justify-content: space-around;
    font-size: 16px;
}

.rrName {
    color: #b2404b;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rrItem {
    width: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.rrItemStatus {
    color: #4fb5f8;
}

.rrMainBlock {
    display: flex;
    flex-direction: column;
}

.rrInputRaw {
    display: flex;
}

.rrInputBlock {
    display: flex;
    justify-content: space-around;
    width: 50%;
}

.rrInput {
    outline: none;
    border: none;
    background-color: #243038;
    border-bottom: 1px solid #9b26e6;
    color: #b450f1;
    font-size: 24px;
    width: 40%;
}

.rrSubmit {
    width: 100%;
    text-decoration: none;
    background: #9b26e6;
    padding: 5px;
    font-size: 1em;
}

.rrSubmit:hover {
    background: #c983f5;
    color: rgb(0, 0, 0);
}
</style>`;

const container = document.querySelector(".market_commodity_order_block");
if (container) {
    container.insertBefore(form, container.firstChild);
}

fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch(error => { alert(error); console.log(error) })

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input1 = document.querySelector("#input1").value;
    const input2 = document.querySelector("#input2").value;

    const match = window.location.pathname.match(/\/(\d+)\//);
    const appId = match ? match[1] : "";

    fetch("http://localhost:4141/webhook/ronin", {
        method: "POST",
        body: JSON.stringify({ input1, input2, appId }),
        headers: { "Content-Type": "application/json" },
    })
})