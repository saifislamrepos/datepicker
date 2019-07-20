const name = process.argv[2];
module.exports = {
    js : 'import React \,\{Component\} from \'react\' ;\n'+
    'import '+name+'css from \'\.\/'+name+'\.scss\';\n'+
    'class '+name+' extends React\.Component {\n'+
    '    constructor\(props\) \{\n'+
    '       super(props)\;\n'+
    '       this\.state = {\n'+
    '           message : '+name+'\n'+
    '       }\n'+
    '    }\n'+
    '    render() {\n'+
    '        const message = this\.state\.message\n'+
    '        return (\n'+
    '            <div>\n'+
    '                <div className="class">\n'+
    '                message : {message}\n'+
    '                </div>\n'+
    '            </div>\n'+
    '        );\n'+
    '    }\n'+
    '}\n'+
    'export default '+name+';\n',
    scss:'.'+name+'{\n'
        +'}'
};
