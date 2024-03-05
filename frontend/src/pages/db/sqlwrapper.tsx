import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-sqlserver"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/ext-language_tools"
const template = `
-- El siguiente un ejemplo de prueba
ALTER ROLE db_datareader
	ADD MEMBER Ben;
GO
`
export function SqlWrapper () {
function onChange (newValue:any) {
    console.log("change", newValue)
}
return(
    <>
        <AceEditor
            mode="sqlserver"
            theme="github"
            defaultValue={template}
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScroling: true }}
        />
    </>
)
}
