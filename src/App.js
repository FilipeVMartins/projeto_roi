import React from 'react';
import NumberFormat from 'react-number-format';


import './App.css';

export default class App extends React.Component {

  state = {
    venda_mensal: '',
    qtd_lojas: '',
    margem_bruta: '',
    preco_loja: '',
    crescimento_vendas: '',
  }

  async componentDidMount(){
    
    
  };

  submitForm = (event) => {
    event.preventDefault();

    if (this.validarForm()){
      this.calcularRoi();
    }

    

    
  }



  validarForm () {
    let fieldsID = ['venda_mensal', 'qtd_lojas', 'margem_bruta', 'preco_loja', 'crescimento_vendas'];

    let formValido = true;
    fieldsID.forEach((fieldID, index)=>{
      if (!this.state[fieldID]) {
        document.querySelector(`#${fieldID}`).style.borderColor='red';
        formValido = false;
      } else {
        document.querySelector(`#${fieldID}`).style.borderColor='#c3c3c3';
      }
    });
    //console.log(formValido)

    if (!formValido){
      alert("Os campos em vermelho são obrigatórios!");
    }
    return formValido;
  }

  calcularRoi () {
    let precoTotalUseCash = this.state.preco_loja * this.state.qtd_lojas;

    let despesas_normais = (100 - this.state.margem_bruta)/100;

    let venda_mensal_pos_crescimento = this.state.venda_mensal * ((this.state.crescimento_vendas/100)+1);

    //let margem_bruta_pos_crescimento = ((venda_mensal_pos_crescimento - (venda_mensal_pos_crescimento * 0.4) - precoTotalUseCash)*100)/venda_mensal_pos_crescimento;

    let lucro_bruto_anterior = this.state.venda_mensal * (this.state.margem_bruta/100);

    let lucro_pos_crescimento = venda_mensal_pos_crescimento - (venda_mensal_pos_crescimento * despesas_normais) - precoTotalUseCash - lucro_bruto_anterior;

    if (lucro_pos_crescimento >= 0){
      alert(`Pode Contratar, o faturamento será aumentado em R$ ${lucro_pos_crescimento}`)
    } else {
      alert('Não Contratar')
    }

  };


  render() {
    return (
      <div className="App">
          <header className="app-header">
            <h1 className="app-title">
              Simulador ROI
            </h1>
            <nav className="app-nav">
              
            </nav>
          </header>


          <main className="app-content">

            <div className="form-wrapper">
              <form onSubmit={this.submitForm}>
                <div>
                  <label htmlFor="venda-mensal">Venda Mensal: </label>
                  <NumberFormat thousandSeparator={'.'} decimalSeparator={','} allowNegative={false} prefix={'R$ '} value={this.state.venda_mensal} onValueChange={(values) => {this.setState({venda_mensal: parseFloat(values.floatValue)})}} placeholder="R$ 0,00" id="venda_mensal" name="venda_mensal" className=""></NumberFormat>
                </div>
                <div>
                  <label htmlFor="qtd-lojas">Quantidade de Lojas: </label>
                  <NumberFormat thousandSeparator={'.'} decimalSeparator={','} allowNegative={false} value={this.state.qtd_lojas} onValueChange={(values) => {this.setState({qtd_lojas: parseFloat(values.floatValue)})}} placeholder="1" id="qtd_lojas" name="qtd_lojas" className=""></NumberFormat>
                </div>
                <div>
                  <label htmlFor="margem-bruta">Margem Bruta de Lucro: </label>
                  <NumberFormat thousandSeparator={'.'} decimalSeparator={','} allowNegative={false} suffix={'%'} value={this.state.margem_bruta} onValueChange={(values) => {this.setState({margem_bruta: parseFloat(values.floatValue)})}} placeholder="60%" id="margem_bruta" name="margem_bruta" className=""></NumberFormat>
                </div>
                <div>
                  <label htmlFor="preco-loja">Preço Cobrado por Loja: </label>
                  <NumberFormat thousandSeparator={'.'} decimalSeparator={','} allowNegative={false} prefix={'R$ '} value={this.state.preco_loja} onValueChange={(values) => {this.setState({preco_loja: parseFloat(values.floatValue)})}} placeholder="R$ 0,00" id="preco_loja" name="preco_loja" className=""></NumberFormat>
                </div>
                <div>
                  <label htmlFor="crescimento-vendas">Crescimento em 30 dias: </label>
                  <NumberFormat thousandSeparator={'.'} decimalSeparator={','} allowNegative={false} suffix={'%'} value={this.state.crescimento_vendas} onValueChange={(values) => {this.setState({crescimento_vendas: parseFloat(values.floatValue)})}} placeholder="10%" id="crescimento_vendas" name="crescimento_vendas" className=""></NumberFormat>
                </div>

                <div>
                  <button type="submit">Calcular ROI</button>
                </div>
              </form>
            </div>
            
          </main>
        
          <footer className="app-footer">
              <div>
                <small></small>
              </div>
          </footer>

      </div>
    );
  };
};
