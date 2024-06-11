const { render } = require('ejs');
const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    })
};
exports.register = async function(req, res)  {
 try {
    const contato = new Contato(req.body)
    await contato.register();

    
    if(contato.errors.length > 0) {
        req.flash('errors', contato.errors) 
        req.session.save(() => res.redirect('back'))
        return;
    }
    
    req.flash('success', 'Contato registrado com sucesso') 
    req.session.save(() => res.redirect(`/contato/index/${contato.Contato._id}`))
    return;
    
    } catch(e) {
        return res.render('err404');
    }
};

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('err404');

    const user = await Contato.buscaPorId(req.params.id);
    if(!user) return res.render('err404')

    res.render('contato', {
        contato: user
     });
};

exports.edit = async function(req, res) {
    try {
    if(!req.params.id) return res.render('err404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if(contato.errors.length > 0) {
        req.flash('errors', contato.errors) 
        req.session.save(() => res.redirect('back'))
        return;
    }
    
    req.flash('success', 'Contato editado com sucesso') 
    req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
    return;
    } catch(e) {
        console.log(e)
        return res.render('err404')
    }
};

exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('err404');

    const user = await Contato.delete(req.params.id);
    if(!user) return res.render('err404')

        req.flash('success', 'Contato apagado com sucesso') 
        req.session.save(() => res.redirect('back'))
        return;
};
