// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯
    document.querySelector('#ewallet-form')
        .addEventListener('submit', (e)=> {
            e.preventDefault();
            const type = document.querySelector('.add__type').value;
            const desc = document.querySelector('.add__description').value;
            const value = document.querySelector('.add__value').value;
            if(desc && value) {
                addItems(type, desc, value);
            } 
        })
        // ui adding item to collection container
        function addItems(type, desc, value) {
            const time = setFormattedTime()
            let item = `<div class="item">
                            <div class="item-description-time">
                            <div class="item-description">
                                <p>${desc}</p>
                            </div>
                            <div class="item-time">
                                <p>${time}</p>
                            </div>
                            </div>
                            <div class="item-amount ${ type === '+'? 'income-amount' : 'expense-amount' }">
                            <p>${type}$${sep(value)}</p>
                            </div>
                        </div>`
            const collection = document.getElementById('collection');
            collection.insertAdjacentHTML('afterbegin', item);
            reSetForm();
            addItemToLS(type, desc, value, time);
            totallIncome();
            totallExpenses();
            totallBalance();
        }
        
        
        // reset the all input value
        function reSetForm(){
            document.querySelector('.add__type').value = "+"
            document.querySelector('.add__description').value = ""
            document.querySelector('.add__value').value = ""
        }
        // get data form to LS
        function getDataToLS() {
            let items = localStorage.getItem('items');
            //items = (items)? JSON.parse(items) : []
            if(items) {
                items = JSON.parse(items);
            } else  {
                items = [];
                whenNoItem();
            }
            return items;
        }
        // add item data to local storage 
        function addItemToLS(type, desc, value, time) {
           let items = getDataToLS()
            items.push({type, desc, value, time})
            localStorage.setItem('items', JSON.stringify(items));
        }
        // show items to ui 
        function showItemformLs(){
            let items = getDataToLS();
            let collection = document.querySelector('.collection');
            items.forEach((item) => {
                item = `<div class="item">
                            <div class="item-description-time">
                            <div class="item-description">
                                <p>${item.desc}</p>
                            </div>
                            <div class="item-time">
                                <p>${item.time}</p>
                            </div>
                            </div>
                            <div class="item-amount ${ item.type === '+'? 'income-amount' : 'expense-amount' }">
                            <p>${item.type}$${sep(item.value)}</p>
                            </div>
                        </div>`
            collection.insertAdjacentHTML('afterbegin', item);
            });
        }
        showItemformLs()
        // calculation to income and expencess 
        totallIncome()
        function totallIncome(){
            const items = getDataToLS()
            let income = 0;
            items.forEach((item)=>{
                if(item.type === '+') {
                    income += Number.parseInt(sep(item.value))
                }
            })
            document.querySelector('.income__amount p').textContent = `$${sep(income)}`
        }

        totallExpenses()
        function totallExpenses() {
            const items = getDataToLS()
            let expenses = 0;
            items.forEach((item)=> {
                if(item.type === '-') {
                    expenses += Number.parseInt(item.value, 10);
                }
            })
            document.querySelector('.expense__amount p').textContent = `$${sep(expenses)}`
        }
        totallBalance();
        function totallBalance(){
            const items = getDataToLS();
            let  blance = 0;
                items.forEach((item)=>{
                if(item.type === '+'){
                    blance += Number.parseInt(item.value);
                } else {
                    blance -= Number.parseInt(item.value);
                }
            })
            document.querySelector('.balance__amount p').textContent = `$${sep(blance)}`;
            document.querySelector('header').className = `${blance > 0? 'green' : 'red'}`;
        }
        // utility function

        function setFormattedTime() {
            const now = new Date().toLocaleTimeString('en-US', {
                month : 'short',
                day : '2-digit',
                hour : '2-digit',
                minute : 'numeric'
            })
            const time = now.split(',')[1];
            const month = now.split(',')[0].split(' ')[0];
            const day = now.split(',')[0].split(' ')[1];
            
            let formattedtime = `${day} ${month}, ${time}`
            return formattedtime;
        }
       
    function sep(amount){
        amount = Number.parseInt(amount, 10);
        return amount.toLocaleString();
    } 
    // when inside collection on item that time remove style from item container 
    function whenNoItem() {
    const collectionid = document.getElementById('collection');
       if(collectionid.children.length === 0 ) {
        collectionid.removeAttribute('class');
       } else {
           collectionid.setAttribute('class', 'collection');
       }
           
    }
