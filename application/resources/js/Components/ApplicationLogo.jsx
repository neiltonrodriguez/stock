export default function ApplicationLogo(props) {
    return (
         <svg {...props} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            {/* Caixa principal */}
            <path 
                d="M37 17L25 10L13 17V33L25 40L37 33V17Z" 
                stroke={props.stroke || "#4c1b05"} 
                strokeWidth="2"
                fill={props.fill || "#c6c085"}
            />
            
            {/* Divisórias internas */}
            <path 
                d="M13 23L37 23M13 29L37 29" 
                stroke={props.stroke || "#4c1b05"} 
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            
            {/* Ítens na prateleira (representados por linhas) */}
            <path 
                d="M16 20L22 20M16 26L22 26M16 32L22 32" 
                stroke={props.stroke || "#4c1b05"} 
                strokeWidth="2"
                strokeLinecap="round"
            />
            
            {/* Indicador de estoque (ponto de atenção) */}
            <circle 
                cx="35" 
                cy="15" 
                r="3" 
                fill={props.accent || "#f76157"}
            />
        </svg>
    );
}
