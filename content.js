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
            <input class="rrInput" type="text" id="buyprice" name="buyprice" required>
        </div>
        <div class="rrInputBlock">
            <label for="sellprice">Sell Price*:</label>
            <input class="rrInput" type="text" id="sellprice" name="sellprice" required>
        </div>
    </div>
    <br>
    <div class="rrInputRaw">
        <div class="rrInputBlock">
            <label for="amount">Amount:</label>
            <input class="rrInput" type="text" id="amount" name="amount">
        </div>
    </div>

</div>
<br>
<div class="rrPriceBlock">
    <div class="rrBuyPrice">
        <div class="rrPriceRaw">
            <p class="rrPercent">Від найнижчої ціни</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">Percent</p>
            <p class="rrPrice">Price</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">-5%</p>
            <p id="bp1" class="rrPrice copy">---</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">-10%</p>
            <p id="bp2" class="rrPrice copy">---</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">-15%</p>
            <p id="bp3" class="rrPrice copy">---</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">-20%</p>
            <p id="bp4" class="rrPrice copy">---</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">-25%</p>
            <p id="bp5" class="rrPrice copy">---</p>
        </div>
    </div>
    <div class="rrBuyPrice">
        <div class="rrPriceRaw">
            <p class="rrPercent">Від найвищого ордера</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">Percent</p>
            <p class="rrPrice">Price</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">-5%</p>
            <p id="sp1" class="rrPrice copy">---</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">-10%</p>
            <p id="sp2" class="rrPrice copy">---</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">-15%</p>
            <p id="sp3" class="rrPrice copy">---</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">-20%</p>
            <p id="sp4" class="rrPrice copy">---</p>
        </div>
        <div class="rrPriceRaw">
            <p class="rrPercent">-25%</p>
            <p id="sp5" class="rrPrice copy">---</p>
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

.rrPriceBlock {
    display: flex;
    width: 100%;
    font-size: 14px;
}

.rrBuyPrice {
    display: flex;
    width: 50%;
    flex-direction: column;
    border: solid 1px #9b26e6;
}

.rrPriceRaw {
    display: flex;
    width: 100%;
    justify-content: space-around;
    border-bottom: dotted 1px rgb(11, 207, 126);
}

.rrPercent {
    display: flex;
    justify-content: center;
    align-items: center;
    color: wheat;
}

.rrPrice {
    display: flex;
    justify-content: center;
    align-items: center;
    color: aquamarine;
    border-bottom: 1px solid aqua;
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
        await init_form()

        const hash_name_match = window.location.pathname.match(/\/([^/]+)$/)
        const market_hash_name = hash_name_match ? hash_name_match[1] : ""

        if (!market_hash_name) return

        const response = await get_status(market_hash_name)
        const result = await check_status(response)
        await set_status(result)
        if (result == "Checked") {
            await set_ronin_data(response)
        }

        form.addEventListener("submit", async (event) => {
            event.preventDefault()

            console.log('Кнопку натиснули!')

            const item = await gather_item_data()
            await post_item_data(item)
        })

        // await get_prices()
        await set_discount()
        set_copy_to_clipboard()
        // const button = document.getElementById("rrButton")
        // button.addEventListener("click", async (event) => {

        //     console.log('Кнопку натиснули!')

        //     const item = await gather_item_data()
        //     await post_item_data(item)
        // })
    } catch (error) {
        console.log(error)
    }
}


async function get_status(market_hash_name) {
    try {
        console.log("get status")
        const response = await fetch("http://localhost:4141/webhook/ronin?market_hash_name=" + market_hash_name, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

async function init_form() {
    try {
        console.log("Create form")
        const container = document.querySelector(".market_commodity_order_block");
        // const container = document.querySelector("#listings");
        if (container) {
            container.insertBefore(form, container.firstChild);
        }
    } catch (error) {
        console.log(error)
    }
}

async function check_status(data) {
    try {
        let status = "---"
        if (data == null) {
            status = "Missing"
            return status
        }
        if (!data.ronin_buy_price) {
            status = "Unchecked"
            return status
        }
        if (data.ronin_buy_price && data.ronin_sell_price) {
            status = "Checked"
            return status
        }

        console.log(status)
        return status
    } catch (error) {
        console.log(error)
    }
}

async function set_status(data) {
    try {
        const status = document.getElementById("status")
        status.innerText = data

    } catch (error) {
        console.log(error)
    }
}

async function set_ronin_data(data) {
    try {
        const buyprice = document.getElementById("buyprice")
        const sellprice = document.getElementById("sellprice")
        const amount = document.getElementById("amount")

        buyprice.value = data.ronin_buy_price ? data.ronin_buy_price : ""
        sellprice.value = data.ronin_sell_price ? data.ronin_sell_price : ""
        amount.value = data.ronin_buy_amount ? data.ronin_buy_amount : ""
    } catch (error) {
        console.log(error)
    }
}

async function gather_item_data() {
    try {
        const appid_match = window.location.pathname.match(/\/(\d+)\//)
        const appid = appid_match ? appid_match[1] : ""

        const hash_name_match = window.location.pathname.match(/\/([^/]+)$/)
        const market_hash_name_undecoded = hash_name_match ? hash_name_match[1] : ""
        const market_hash_name = decodeURIComponent(market_hash_name_undecoded)

        const ronin_buy_price = +document.getElementById("buyprice").value
        const ronin_sell_price = +document.getElementById("sellprice").value
        const ronin_buy_amount = +document.getElementById("amount").value

        const market_url = "https://steamcommunity.com" + window.location.pathname


        const imgElement = document.querySelector("#mainContents > div.market_page_fullwidth.market_listing_firstsection > div > div > div.market_listing_largeimage > img");
        console.log(imgElement)
        let img_url
        if (imgElement) {
            // img_url = imgElement.getAttribute('src');
            img_url = ""
        } else {
            img_url = ""
        }


        console.log({
            appid,
            market_hash_name,
            market_url,
            ronin_buy_price,
            ronin_sell_price,
            ronin_buy_amount,
            img_url
        })
        return {
            appid,
            market_hash_name,
            market_url,
            ronin_buy_price,
            ronin_sell_price,
            ronin_buy_amount,
            img_url
        }
    } catch (error) {
        console.log(error)
    }
}

async function post_item_data(item) {
    try {
        const response = await fetch("http://localhost:4141/webhook/ronin", {
            method: "POST",
            body: JSON.stringify(item),
            headers: { "Content-Type": "application/json" },
        })

        const data = await response.json()
        await set_status("Okay")
        return data
    } catch (error) {
        await set_status("Error")
        console.log(error)
    }
}

async function get_prices() {
    try {
        const lowest_sell_order = +(document.querySelector("#market_commodity_forsale > span:nth-child(2)").textContent).replace("₴", "").replace(",", ".")
        const hightest_buy_order = +(document.querySelector("#market_commodity_buyrequests > span:nth-child(2)").textContent).replace("₴", "").replace(",", ".")
        console.log(lowest_sell_order, hightest_buy_order)
        return {
            lowest_sell_order,
            hightest_buy_order
        }
    } catch (error) {
        console.log(error)
    }
}

async function set_discount() {
    try {
        const prices = await get_prices()

        const discounts = [5, 10, 15, 20, 25]
        const ids = {
            hightest_buy_order: ["sp1", "sp2", "sp3", "sp4", "sp5"],
            lowest_sell_order: ["bp1", "bp2", "bp3", "bp4", "bp5"]
        }

        for (let i = 0; i < discounts.length; i++) {
            try {
                const order_discount = document.getElementById(ids.hightest_buy_order[i])
                const sell_discount = document.getElementById(ids.lowest_sell_order[i])
                console.log(
                    order_discount,
                    sell_discount
                )

                order_discount.innerText = calculate_discount(discounts[i], prices.hightest_buy_order).discount
                sell_discount.innerText = calculate_discount(discounts[i], prices.lowest_sell_order).discount
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

function calculate_discount(percent, price) {
    const discountedPrice = price * (100 - percent) / 100;
    const savings = price - discountedPrice;

    return {
        discount: discountedPrice.toFixed(2),
        savings
    }
}

function set_copy_to_clipboard() {
    try {
        const elements = document.getElementsByClassName("copy");

        for (let element of elements) {
            element.addEventListener("click", () => {
                const text = element.textContent;
                navigator.clipboard.writeText(text)
                    .then(() => console.log(`Контент "${text}" скопійовано в буфер обміну.`))
                    .catch(err => console.error('Не вдалося скопіювати контент: ', err));
            });
        }

    } catch (error) {
        console.log(error)
    }
}

init()