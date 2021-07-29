function run(raw){
    /*
    raw = {
        tunnelOriginator : `{{tunnel.originator}}`,
        tunnelOwner      : `{{tunnel.owner}}`,
        stagingEnvironment : false
    }
    /*
        {
            "ni" : "<b>", OK
            "nf" : "</b>", OK
            "ii" : "<i>", OK
            "if" : "</i>", OK
            "channel"     : "Chat / WhatsApp / Default", OK
            "environment" : "Dev / Tst / Hmg / Stg / Prd",
            "originator"  : "5548996260373@wa.gw.msging.net", OK
            "regex"       : {
                "forHuman" : "(humano)"
                "forLeave" : "(sair)"  
            }
        }
    */ 
   try 
    {
        if(!raw)
            throw Error("Raw é vazio")  

        let config = {}

        
        config.environment  = discoverEnvironment(raw)
        config.originator   = config.environment != "Dev" ? raw.originator : '{{config.client}}'

        config.channel      =  discoverChannel(config)
        let boldItalic      = {}

        boldItalic = discoverN(config)
        config.ni  = boldItalic.ni
        config.nf  = boldItalic.nf

        boldItalic = discoverI(config)
        config.ii  = boldItalic.ii
        config.if  = boldItalic.if

        let dataWit = new Date()
        let month   = dataWit.getMonth()+1
        month       = dataWit.getMonth().toString().length == 1 ? '0'+ month : month
        let day     = dataWit.getDate().toString().length == 1 ? '0'+dataWit.getDate() : dataWit.getDate()
        dataWit     = dataWit.getFullYear().toString() + (month).toString() + day.toString()

        config.witUrl = `https://api.wit.ai/message?v=${dataWit}&`
        config.witAuthorization = `Bearer 437L4LEIZKDS5LLQ6VFE6CCSHNAR2B5D` 


        return config
    } 
    catch (error) 
    {
        return error.toString()   
    }
}

function discoverChannel(config)
{
    if(config.originator.search('@wa.gw.msging.net') != -1)
        return 'WhatsApp'
    
    if(config.originator.search('@0mn.io') != -1)
        return 'Chat'
    
    return 'Default'
}

function discoverN(config)
{
    let bold = {
        "WhatsApp" : { ni : "*", nf : "*" },
        "Chat"     : { ni : "<b>", nf : "</b>" },
        "Default"  : { ni : "", nf : "" }
    }
    return bold[config.channel]
}

function discoverI(config)
{
    let bold = {
        "WhatsApp" : { ii : "_", if : "_" },
        "Chat"     : { ii : "<i>", if : "</i>" },
        "Default"  : { ii : "", if : "" }
    }
    return bold[config.channel]
} 

function discoverEnvironment(raw)
{
    let debugEnvironment = (raw.tunnelOwner.length == 0)
    let homologEnvironment = (raw.tunnelOwner.match(/(hmg|homolog|homg)/gi))
    let developmentEnvironment = (raw.tunnelOwner.match(/(dev|bet)/gi)) 
    let stagingEnvironment = (raw.stagingEnvironment)

    if(debugEnvironment)
        return 'Dev'

    if(homologEnvironment)
        return 'Hmg'

    if(developmentEnvironment)
        return 'Tst'

    if(stagingEnvironment)
        return 'Stg'

    return 'Prd'
}