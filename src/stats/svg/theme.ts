export type ThemeName =  "sunset" | "sunrise" | "dawn" | "tropic" | "powder" | "popsicle" | "dune" | "dusk" | "waves" | "mulberry" | "crimson" | "lavendar" | "forest" | "cold" | "burnt" | "candy" | "herd" | "totoro"; 

export const THEMES: Record<ThemeName, string[]> = {
    sunset: [
        "#e2d850",
        "#ffa537",
        "#e8507b",
        "#883030",
        "#180a0a"
    ],

    sunrise:[
        '#f9d98a',
        '#f4a26b',
        '#f26d85',
        '#b85c8a',
        '#d4829e',
    ],

    dawn:[
        "#a9b8d6",
        "#c9627e",
        "#546C8C",
        "#A6567B",
       " #e0c57c"
    ],

    tropic:[
        "#267365",
        "#F2CB05",
        "#db6028",
        "#f20574",
        "#F23030",
    ],

    powder:[
        "#000000",
        "#bd0b0b",
        "#4a4343",
        "#D9D9D9",
        "#b03232",
    ],

    popsicle:[
        "#F07289",
        "#83D1F4",
        "#A2D7A6",
        "#FFF25F",
        "#F4AA66"
    ],

    dune:[
        "#A66B37",
        "   #8C251C",
        "#c7c0a6",
        "#4f0f09",
        "#BF372A"
    ],

    dusk:[
        "#3A3659",
        "#A64456",
        "#f7c497",
        "#d45246",
        "#782d27"
    ],

    waves:[
        "#569cc7",
        "#04254d",
        "#b3cedf",
        "#093f8c",
        "#011C26"
    ], 

    mulberry:[
        "#220c21",
        "#9b013c",
        "#c5556b",
        "#d82d44",
        "#e13e53",
        "#540032",
    ],

    crimson:[
        "#c90439",
        "#2D83A6",
        "#68001c",
        "#254159",
        "#A9CBD9"
    ],

    lavendar:[
        "#AD64B2",
        "#AD64B2",
        "#C8B2F5",
        "#FFC5E5",
        "#A9DBD9"
    ],
    
    candy:[
        '#b85c8a',
      '#d4829e',
      '#e8a0b4',
      '#a3c4bc',
      '#7eb8c9',
    ],
    
    forest:[
        "#063027",
        "#014034",
        "#038C65",
        "#025940",
        "#038C3E"
    ],

    cold:[
        "#0C5944",
        "#D0E9F2",
        "#1797A6", 
        "#83dfe9",
        "#062d28",
    ],

    burnt:[
        "#400808",
        "#D97904",
        "#813e03",
        "#D9AB73",
        "#3c3232"
    ],


    herd:[
        "#0F1F40",
        "#D98BA7",
        "#8699d0",
        "#734E46",
        "#0D0D0D"

    ],

    totoro:[
        "#5c5450",
        "#eadeb6",
        "#81b240",
        "#9ec0e5",
        "#0D0D0D"
    ]
}

export const GITHUB_LANGUAGE_COLORS: Record<string, string> = {
  // --- Compiled Languages ---
  'C': '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  'Java': '#b07219',
  'Kotlin': '#A97BFF',
  'Swift': '#F05138',
  'Objective-C': '#438eff',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Dart': '#00B4AB',
  'Scala': '#c22d40',
  'Haskell': '#5e5086',
  'OCaml': '#3be133',
  'Fortran': '#4d41b1',
  'Assembly': '#6E4C13',
  'Zig': '#ec915c',
  
  // --- Scripting Languages ---
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python': '#3572A5',
  'Ruby': '#701516',
  'PHP': '#4F5D95',
  'Perl': '#0298c3',
  'Lua': '#000080',
  'R': '#198CE7',
  'Julia': '#a270ba',
  'Groovy': '#4298b8',
  
  // --- Functional Languages ---
  'Elixir': '#6e4a7e',
  'Erlang': '#B83998',
  'Clojure': '#db5855',
  'F#': '#b845fc',
  'Scheme': '#1e4aec',
  'Racket': '#3c5caa',
  'Common Lisp': '#3fb68b',
  'Elm': '#60B5CC',
  
  // --- Web Technologies ---
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'SCSS': '#c6538c',
  'Sass': '#a53b70',
  'Less': '#1d365d',
  'Stylus': '#ff6347',
  'Vue': '#41b883',
  'Svelte': '#ff3e00',
  'Astro': '#ff5a03',
  
  // --- Mobile ---
  'Objective-C++': '#6866fb',
  'Apex': '#1797c0',
  
  // --- Shell/Scripting ---
  'Shell': '#89e051',
  'Bash': '#89e051',
  'PowerShell': '#012456',
  'Batchfile': '#C1F12E',
  'Vim Script': '#199f4b',
  'Emacs Lisp': '#c065db',
  
  // --- Config/Data ---
  'YAML': '#cb171e',
  'JSON': '#292929',
  'TOML': '#9c4221',
  'XML': '#0060ac',
  'Markdown': '#083fa1',
  'reStructuredText': '#141414',
  'AsciiDoc': '#73a0c5',
  
  // --- Build/Infrastructure ---
  'Dockerfile': '#384d54',
  'Makefile': '#427819',
  'CMake': '#DA3434',
  'Gradle': '#02303a',
  'Nix': '#7e7eff',
  'Terraform': '#5C4EE5',
  'HCL': '#5C4EE5',
  
  // --- Database/Query ---
  'SQL': '#e38c00',
  'PLpgSQL': '#336790',
  'PLSQL': '#dad8d8',
  'TSQL': '#e38c00',
  'GraphQL': '#e10098',
    
  // --- Scientific Computing ---
  'Jupyter Notebook': '#DA5B0B',
  'MATLAB': '#e16737',
  'Mathematica': '#dd1100',
  'TeX': '#3D6117',
  'Gnuplot': '#f0a9f0',
  
  // --- Game Development ---
  'GDScript': '#355570',
  'Papyrus': '#6600cc',
  'AngelScript': '#C7D7DC',
  'ShaderLab': '#222c37',
  'HLSL': '#aace60',
  'GLSL': '#5686a5',
  
  // --- Esoteric/Teaching ---
  'Brainfuck': '#2F2530',
  'Smalltalk': '#596706',
  'Processing': '#0096D8',
  
  // --- Other Notable Languages ---
  'CoffeeScript': '#244776',
  'LiveScript': '#499886',
  'PureScript': '#1D222D',
  'Reason': '#ff5847',
  'ReasonML': '#ff5847',
  'Crystal': '#000100',
  'Nim': '#ffc200',
  'V': '#4f87c4',
  'Vala': '#fbe5cd',
  'D': '#ba595e',
  'Pascal': '#E3F171',
  'Delphi': '#E3F171',
  'Ada': '#02f88c',
  'COBOL': '#000000',
  'ActionScript': '#882B0F',
  'AppleScript': '#101F1F',
  'AutoHotkey': '#6594b9',
  'Ballerina': '#FF5000',
  'Jsonnet': '#0064bd',
  'Solidity': '#AA6746',
  'Move': '#4a137a',
  'Handlebars': '#f7931e',
  'Pug': '#a86454',
  'EJS': '#a91e50',
  'Smarty': '#f0c040',
};
