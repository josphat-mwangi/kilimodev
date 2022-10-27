const express               = require('express');
const dotenv                = require('dotenv');
const bodyparser            = require("body-parser");
const db                    = require('./src/config/database');
const { initializeClient }  = require('elarian');
const Product               = require('./src/models/product')
const UssdMenu              = require('ussd-builder');

const main = async () =>{
    const app =  express()
dotenv.config()
db.connect();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());




let menu = new UssdMenu();

let dataToSave = {}

const atCredentials = {
    apiKey  : '39159c889bdd17e293e8361ea5e457779a6e8da3f6e485be41fe2448243b88e0',
    username: 'sandbox'
}
const AfricasTalking = require('africastalking')(atCredentials)
const sms = AfricasTalking.SMS
const payments = AfricasTalking.PAYMENTS;

const client = await initializeClient({
    apiKey: 'el_k_test_928da648bb156998da2e6e7b5a1659951bb9141624bb88d10c1679f0d54bf871', 
    orgId: 'el_org_eu_fuVCDu',
    appId: 'el_app_ivlA0S',
});
// const client = await initializeClient({
//     apiKey: 'el_k_live_639f28ff3e91d37b1230cc5aad63acb7ef33fa9421ed35412a5c367a1e8e3a64', 
//     orgId: 'el_org_eu_3hMDi9',
//     appId: 'el_app_8vbzTe',
// });



menu.startState({
    run: () =>{
        menu.con('Welcome to KilimoDev: ' + '\n1. Our services ' + '\n2. Exit!');
    },
    next:{
        '1': 'ourServices',
        '2': 'quit'
    }
});

menu.state('ourServices', {
    run: async () =>{
        console.log(dataToSave);
        
        


        menu.con('Please enter your location to view our services ?')
    },
    next: {
        '*[a-zA-Z]+': 'ourServices.location'
    }
});

menu.state('ourServices.location', {
    run: () => {
        let location = menu.val;
        
        // dataToSave.name = name;
        // console.log(dataToSave);
        
        menu.con('1. Seedlings Orders' + '\n2. Planting Technics' + '\n3. Market Places');
    },

    next:{
        '1': 'seedlingsOrder',
        '2': 'plantingTechnics',
        '3': 'marketplace'
    },

});

menu.state('seedlingsOrder', {
    run: () => {
        menu.con('1. Cabbage' + '\n2. Onions' + '\n3. Tomatoes');

    },
    next: {
        '1': 'cabbage',
        '2': 'onions',
        '3': 'tomatoes'
    }
});

menu.state('cabbage', {
    run: () => {
        menu.con('1. One acre -- Ksh 5' );

    },
    next: {
        '1': 'one',
        
    }
});


menu.state('onions', {
    run: () => {
        menu.con('1. One acre -- Ksh 5');

    },
    next: {
        '1': 'one',
        
    }
});

menu.state('tomatoes', {
    run: () => {
        menu.con('1. One acre -- Ksh 5');

    },
    next: {
        '1': 'one',
        
    }
});

menu.state('one', {
    run: async () => {
        
        const productName = "myPaymentProductName";
    
        // Set your mobile b2c recipients
        const recipients = [{
            phoneNumber: menu.args.phoneNumber,
            currencyCode: "KES",
            amount: 5,
            metadata: {
                "foor": "bar",
                "key": "value"
            },
            // reason: "BusinessPayment"
        }];
    
        // That's it, hit send and we'll take care of the rest
        try {
            const result = await payments.mobileB2C({ productName, recipients })
            console.log(result);
        } catch (err) {
            console.log(err);
        }


        menu.end('Hello the ' );

    }


})






menu.state('plantingTechnics', {
    run: () => {
        menu.con('1. Onions' + '\n2. Cabbage ' + '\n3. Tomatoes' );
    },
    next: {
        '1': 'onions',
        '2': 'cabbage',
        '3': 'tomatoes',
       
    }
});

menu.state('onions', {
    run: async () => {
        dataToSave.phoneNumber = menu.args.phoneNumber;
        console.log(dataToSave);
       
        const result = await sms.send({
            to: menu.args.phoneNumber,
            message: 'Hi , First prepare  a good seed bed prepared  with all lumps broken up with a disc on  a weel ploughed land .Make a nursery  bed on it  to raise your seedlings near the planting site.Seedlings will be ready for transplanting in about 40 days.\n Do you need an expert to be sent to you send Yes to get a reply'
        })
        console.log("working", result)

     ;

        menu.end('Hello the planting technic has been sent to your sms' );
    },
    
});

menu.state('cabbage', {
    run: async () => {
        dataToSave.phoneNumber = menu.args.phoneNumber;
        console.log(dataToSave);
        const result = await sms.send({
            to: menu.args.phoneNumber,
            message: `Hi Use our certified seeds, setup a nursery with a seedbed of 1m width and of a convenient lenght , make drills on the seedbed at a  spacing of 10- 20cm thinly sow the seeds in the drills and cover lightly with soil.Transplanting will be ready after 30 days. \n
            Do you need an expert to be sent to you send Yes to get a reply`
        });

        menu.end('Hello the planting technic has been sent to your sms' );
    },
    
});

menu.state('tomatoes', {
    run: async () => {
        dataToSave.phoneNumber = menu.args.phoneNumber;
        console.log(dataToSave);
        const result = await sms.send({
            to: menu.args.phoneNumber,
            message:  `Hi , prepare a seedbed by raiing soil 15cm .The soil  should be tilled.The tomato spacing should be around 15cm .The bed should be covered with hay or dry grass to increase moisture level.The seedlings will take a month before they are ready for transplanting. \n
            Do you need an expert to be sent to you send Yes to get a reply` 
        })
    
        
        menu.end('Hello the planting technic has been sent to your sms' );
    },
    
});





menu.state('marketplace', {
    run: () => {
        menu.con('1. Sell' + '\n2. Buy' );
    },
    next: {
        '1': 'sell',
        '2': 'buy'
    }
});


menu.state('sell', {
    run: () => {
        let phone = menu.args.phoneNumber
        console.log(phone)
        dataToSave.phone = phone
        console.log(dataToSave)

        menu.con('Enter farm product name');
    },
    next: {
        '*[a-z]+': 'sell.productName'
    }
});

menu.state('sell.productName', {
    run: async () => {
        let productName        = menu.productName;
        dataToSave.productName = productName;
        console.log(dataToSave);
        menu.con('Enter farm product price per kg');
    },
    next: {
        '*\\d+': 'end'
    }
});

menu.state('end', {
    run: async () =>{
        let price        = menu.val;
        dataToSave.price = price;
        console.log(dataToSave);

        // save data
        const data = new Product({
            name   : dataToSave.productName,
            price  : dataToSave.price,
            phoneNumber  : dataToSave.phone
        });

        const dataSaved = await data.save();
        menu.end('Awesome! The farm product was succesfully posted. The buyer will contact you directly')
    }
});



menu.state('buy', {
    run: () => {
        menu.con("Enter the name of the product.We have:" +'\n1. Cabbage' + '\n2. Onions' + '\n3. Tomatoes');
    },
    next: {
        '*[a-z]+': 'buy.product'
    }
});


menu.state('buy.product', {
    run: async () => {
        const productName = "myPaymentProductName";
    
        // Set your mobile b2c recipients
        const recipients = [{
            phoneNumber: menu.args.phoneNumber,
            currencyCode: "KES",
            amount: 5,
            metadata: {
                "foor": "bar",
                "key": "value"
            },
            // reason: "BusinessPayment"
        }];
    
        // That's it, hit send and we'll take care of the rest
        try {
            const result = await payments.mobileB2C({ productName, recipients })
            console.log(result);
        } catch (err) {
            console.log(err);
        }

        const productItem = await Product.find({name: menu.val})
        const result = await sms.send({
            to: menu.args.phoneNumber,
            message: `Hello here are the product.\n ${productItem}`
        })
       
        menu.end("The product has being send successfully");
    },
   
});




menu.state('quit', {
    run: () =>{
        menu.end("Thank you for using our services")
    }
});


app.get('/', (req, res)=>{
    res.send("hello world")
})

app.post('/ussd', (req, res)=>{
    menu.run(req.body, ussdResult => {
        res.send(ussdResult)
    })
})



const port = 4000

app.listen(port, async ()=> {
    console.log(`Server Running ${port}`), await db.connect();
})
}


main()




