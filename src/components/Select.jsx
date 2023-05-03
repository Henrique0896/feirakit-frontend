


export function Select() {
    return (
    <div className="container">
        <form>
            <label htmlFor="state">Estado:</label>
            <select id="state">
                <option value="">Selecione um estado...</option>
            </select>
            <label htmlFor="city">Cidade:</label>
            <select id="city">
                <option value="">Selecione uma cidade...</option>
            </select>
        </form>
    </div>
    )
}
