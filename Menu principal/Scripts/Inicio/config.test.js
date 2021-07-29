const { expect, test } = require('@jest/globals')
const run = require('./config')

test("Testa passando variaveis de inicialização vazias", () =>{
    const r =  run()
    expect(r).toBeDefined()
})

test("Testa se conseguiu identificar o canais corretamente", () =>{
    let raw = {
        tunnelOriginator : `marcelinho22@0mn.io`,
        tunnelOwner : `thiagueira17`
    }
    let r = run(raw)
    expect(r.channel).toBe("Chat")

    raw = {
        tunnelOriginator : `5548996260373@wa.gw.msging.net`,
        tunnelOwner : `thiagueira17`
    }
    r = run(raw)
    expect(r.channel).toBe("WhatsApp")

    raw = {
        tunnelOriginator : `marcelinho22`,
        tunnelOwner : `thiagueira17`
    }
    r = run(raw)
    expect(r.channel).toBe("Default")

})

test("Testa se esta trazendo os negritos e italicos corretamente", ()=>{
    let raw = {
        tunnelOriginator : `marcelinho22@0mn.io`,
        tunnelOwner : `thiagueira17`
    }
    let r = run(raw)
    expect(r.ni).toBe("<b>")
    expect(r.nf).toBe("</b>")
    expect(r.ii).toBe("<i>")
    expect(r.if).toBe("</i>")


    raw = {
        tunnelOriginator : `5548996260373@wa.gw.msging.net`,
        tunnelOwner : `thiagueira17`
    }
    r = run(raw)
    expect(r.ni).toBe("*")
    expect(r.nf).toBe("*")
    expect(r.ii).toBe("_")
    expect(r.if).toBe("_")

    raw = {
        tunnelOriginator : `marcelinho22`,
        tunnelOwner : `thiagueira17`
    }
    r = run(raw)
    expect(r.ni).toBe("")
    expect(r.nf).toBe("")
    expect(r.ii).toBe("")
    expect(r.if).toBe("")
})

test("Testa se conseguiu identificar ambientes", () => {
    let rawDebug = {
        tunnelOriginator   : ``,
        tunnelOwner        : ``,
        stagingEnvironment : false 
    }
    let rawTest = {
        tunnelOriginator   : `marcelinho22@0mn.io`,
        tunnelOwner        : `pizzashopdev@msging.net`,
        stagingEnvironment : false 
    }
    let rawHomolog = {
        tunnelOriginator   : `marcelinho22@0mn.io`,
        tunnelOwner        : `pizzashophmg@msging.net`,
        stagingEnvironment : false 
    }
    let rawStaging = {
        tunnelOriginator   : `marcelinho22@0mn.io`,
        tunnelOwner        : `pizzashop@msging.net`,
        stagingEnvironment : true 
    }
    let rawProduction = {
        tunnelOriginator   : `marcelinho22@0mn.io`,
        tunnelOwner        : `pizzashop@msging.net`,
        stagingEnvironment : false 
    }
    
    expect(run(rawDebug).environment).toBe("Dev")
    expect(run(rawTest).environment).toBe("Tst")
    expect(run(rawHomolog).environment).toBe("Hmg")
    expect(run(rawStaging).environment).toBe("Stg")
    expect(run(rawProduction).environment).toBe("Prd")

})