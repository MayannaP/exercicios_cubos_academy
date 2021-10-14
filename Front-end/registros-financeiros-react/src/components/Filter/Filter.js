import { useState } from "react";
import "./Filter.css";
import "../../global.css";
import iconFilter from "../../assets/icon-filter.svg";
import iconFilterClose from "../../assets/icon-filter-close.svg";

export default function Filter({
  categorias,
  setFilterContainer,
  filtrar,
  setRegistroUpdate,
}) {
  const cleanFilter = {
    dia_da_semana: [],
    categoria: [],
    valor: {
      min: "",
      max: "",
    },
  };

  const days = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [applyFilters, setApplyFilters] = useState(cleanFilter);

  function handleClickDay(e) {
    let newFilters = applyFilters;
    const day = e.target.firstChild.textContent;

    if (e.target.selected) {
      const index = newFilters.dia_da_semana.findIndex((e) => e === day);
      newFilters.dia_da_semana.splice(index, 1);

      e.target.children[0].src = iconFilter;
      e.target.selected = false;
      e.target.className = "container-chip";
    } else {
      newFilters.dia_da_semana.push(day);
      e.target.selected = true;
      e.target.children[0].src = iconFilterClose;
      e.target.className = "container-chip selected";
    }
    setApplyFilters(newFilters);
  }

  function handleClickApplyFilter() {
    applyFilters.valor.min = Number(min) * 100;
    applyFilters.valor.max = Number(max) * 100;
    filtrar(applyFilters);
  }

  function handleClickClearFilter() {
    setApplyFilters(cleanFilter);
    setFilterContainer(false);
    setRegistroUpdate(true);
  }

  function handleClickCategory(e) {
    const newFilters = applyFilters;
    const selectedCategory = e.target.firstChild.textContent;
    if (e.target.selected) {
      const index = newFilters.categoria.findIndex(
        (e) => e === selectedCategory
      );
      newFilters.categoria.splice(index, 1);

      e.target.children[0].src = iconFilter;
      e.target.selected = false;
      e.target.className = "container-chip";
    } else {
      newFilters.categoria.push(selectedCategory);
      e.target.selected = true;
      e.target.children[0].src = iconFilterClose;
      e.target.className = "container-chip selected";
    }
    setApplyFilters(newFilters);
  }

  return (
    <div className="container-filters">
      <div className="filter flex-column">
        <h3 className="filters__title">Dia da semana</h3>
        <div className="filter-options">
          {days.map((day, index) => {
            return (
              <button
                className="container-chip"
                key={index}
                selected={false}
                onClick={handleClickDay}
              >
                {day}
                <img src={iconFilter} alt="" />
              </button>
            );
          })}
        </div>
      </div>
      <div className="filter flex-column">
        <h3 className="filters__title">Categoria</h3>
        <div className="filter-options">
          {categorias &&
            categorias.map((categoria, index) => {
              return (
                <button
                  className="container-chip"
                  id={index}
                  selected={false}
                  onClick={handleClickCategory}
                >
                  {categoria}
                  <img src={iconFilter} alt="" />
                </button>
              );
            })}
        </div>
      </div>
      <div className="filter flex-row flex-column">
        <h3 className="filters__title">Valor</h3>
        <label htmlFor="min" className="filters__label">
          Min
        </label>
        <input
          type="text"
          className="filters__value-input"
          id="min-value"
          onChange={(e) => setMin(e.target.value)}
          value={min}
        />
        <label htmlFor="max" className="filters__label">
          Máx
        </label>
        <input
          type="text"
          className="filters__value-input"
          id="max-value"
          onChange={(e) => setMax(e.target.value)}
          value={max}
        />
      </div>
      <div className="filter-buttons">
        <button className="btn-clear-filters" onClick={handleClickClearFilter}>
          Limpar filtros
        </button>
        <button className="btn-apply-filters" onClick={handleClickApplyFilter}>
          Aplicar filtros
        </button>
      </div>
    </div>
  );
}