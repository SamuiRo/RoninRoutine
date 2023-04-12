const form = document.createElement("form");
form.innerHTML = `<div class="rrForm">
<div class="rrName">RoninRoutine</div>
<br>
<div class="rrInputBlock">
    <div class="rrInnerBlock">
        <label for="input1">BUY Price:</label>
        <input class="rrInput" type="number" id="input1" name="input1" required>
    </div>
    <div class="rrInnerBlock">
        <label for="input2">SELL Price:</label>
        <input class="rrInput" type="number" id="input2" name="input2" required>
    </div>
</div>
<br>
<br>

<input class="rrSubmit" type="submit" value="Submit">
</div>

<style>
.rrName {
    display: flex;
    justify-content: center;
    font-style: italic;
    color: rgb(255, 0, 0);
}

.rrInputBlock {
    display: flex;
}

.rrInnerBlock {
    /* height: 60px; */
    width: 50%;
    display: flex;
    justify-content: space-around;
}

.rrInput {
    height: 1em;
    border-bottom: 2px Solid rgb(1, 255, 1);
    color: rgb(255, 0, 170);
    /* width: 50%; */
    font-size: 1em;
    padding: 0;
    background-color: rgb(0, 0, 0);
}

.rrForm {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    /* align-items: center; */
    background-color: rgb(70, 42, 122);
    padding: 10px 0 10px 0;
    /* border: 2px dashed red */
    font-size: 24px;
}

.rrSubmit {
    width: 100%;
    text-decoration: none;
    background: rgb(32, 119, 32);
    padding: 5px;
    border: 1px Solid rgb(7, 153, 146);
    font-size: 1em;
}

.rrSubmit:hover {
    background: rgb(25, 182, 25);
    color: rgb(138, 2, 2);
}
</style>`;

const container = document.querySelector(".market_commodity_order_block");
if (container) {
    container.insertBefore(form, container.firstChild);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input1 = document.querySelector("#input1").value;
    const input2 = document.querySelector("#input2").value;

    const match = window.location.pathname.match(/\/(\d+)\//);
    const appId = match ? match[1] : "";

    fetch("https://example.com/submit", {
        method: "POST",
        body: JSON.stringify({ input1, input2, appId }),
        headers: { "Content-Type": "application/json" },
    })
})