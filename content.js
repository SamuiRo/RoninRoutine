

const form = document.createElement("form");

form.innerHTML = `<div class="rrForm">
<div class="rrHeader">
    <div class="rrName">RoninRoutine</div>
    <div class="rrItem">
        <p>Status:</p>
        <p class="rrItemStatus" id="status"></p>
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
    border-bottom: 1px solid #9b26e6 !important;
    color: #b450f1 !important;
    font-size: 24px !important;
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

async function init() {
    try {
        const appid_match = window.location.pathname.match(/\/(\d+)\//);
        const appid = appid_match ? appid_match[1] : "";
        // const hash_name_match = window.location.pathname.match(`/\/market\/listings\/753\/(.*)/`);
        const hash_name_match = window.location.pathname.match(/\/([^/]+)$/);
        const market_hash_name = hash_name_match ? hash_name_match[1] : "";

        if (!market_hash_name) return

        const response = await fetch("http://localhost:4141/webhook/ronin?market_hash_name=" + market_hash_name, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const data = await response.json()
        console.log(data)
        const decodedString = decodeURIComponent(market_hash_name);
        console.log(decodedString);
        // const container = document.querySelector(".market_commodity_order_block");
        const container = document.querySelector("#searchResultsTable");
        if (container) {
            container.insertBefore(form, container.firstChild);
        }
        const status = document.getElementById("status")
        if (!data) {
            status.innerText = "Fetch ERR"
        }
        if (!data.ronin_buy_price || !data.ronin_sell_price) {
            status.innerText = "Missing"
        } else {
            status.innerText = "Checked"
        }

        const input1 = document.getElementById("buyprice")
        const input2 = document.getElementById("sellprice")
        const input3 = document.getElementById("amount")

        input1.value = data.ronin_buy_price ? data.ronin_buy_price : ""
        input2.value = data.ronin_sell_price ? data.ronin_sell_price : ""
        input3.value = data.ronin_buy_amount ? data.ronin_buy_amount : ""

        form.addEventListener("submit", (event) => {
            event.preventDefault()

            const ronin_buy_price = document.getElementById("buyprice").value
            const ronin_sell_price = document.getElementById("sellprice").value
            const ronin_buy_amount = document.getElementById("amount").value


            console.log({ ronin_buy_price, ronin_sell_price, ronin_buy_amount, market_hash_name: decodedString, appid })

            fetch("http://localhost:4141/webhook/ronin", {
                method: "POST",
                body: JSON.stringify({ ronin_buy_price, ronin_sell_price, ronin_buy_amount, market_hash_name, appid }),
                headers: { "Content-Type": "application/json" },
            }).then(response => {
                const status = document.getElementById("status")
                status.innerText = "Okay"
            }).catch(error => {
                const status = document.getElementById("status")
                status.innerText = "Error"
            })
        })
    } catch (error) {
        const status = document.getElementById("status")
        status.innerText = "fetch err"
        console.log(error)
    }
}

init()