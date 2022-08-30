const { response} = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT }= require('../helpers/generar-jwt');

const Usuario = require('../models/usuario');

const login = async ( req, res = response) => {

    const { correo, password }= req.body;


    try {
        
        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});

        if (!usuario){

            return res.status(400).json({

                msg : 'Usuario / Password no son correctos - correo',
            })
        }

        // Si el usuario está activo
        if ( !usuario.estado){

            return res.status(400).json({

                msg : 'Usuario / Password no son correctos - estado : false',
            })
        }

        //Verificar la contraseña 

        const validPass = bcryptjs.compareSync( password, usuario.password );

        if (!validPass){
            return res.status(400).json({

                msg : 'Usuario / Password no son correctos - contraseña',
            })

        }
        //Generar el JWT

        const token = await generarJWT( usuario.id);
       
        res.json({

            msg : 'Login ok',
            usuario,
            token
    
        })
    
    } catch (error) {

        console.log(error)

        res.status(500).json({

            msg : 'Hable con el administrador',
           
        })
    
    }
}


module.exports = {

        login
}