# GitHub Top Language Stats

A simple GitHub stats card that shows your most used programming languages as a clean SVG, perfect for your profile README.

Built with NestJS


##  Web Generator

Use the live interface to generate your card easily:

🔗 https://github-toplang-stats.vercel.app/

* Enter your username
* Choose theme
* Hide languages
* Copy ready-to-use markdown


---

## Card Preview 
 *Beach Theme*
![Preview](https://github-toplang-stats.vercel.app/api/stats?username=KhanRameen\&theme=beach&hide=css)



## Features

* Displays top 5 programming languages based on your repositories
* Multiple themes support
* Hide specific languages
* Fast & cached responses



## How to Use

Customize the link below and add it to your GitHub README:

```md
![GitHub Stats](https://github-toplang-stats.vercel.app/api/stats?username=YOUR_USERNAME)
```

### Customization Options

| Parameter  | Description                      | Example               |
| ---------- | -------------------------------- | --------------------- |
| `username` | Your GitHub username             | `username=KhanRameen` |
| `theme`    | Theme name                       | `theme=themeName`        |      |
| `hide`     | Hide languages (comma-separated) | `hide=HTML,CSS`       |


### Themes
 'sunset'
  | 'sunrise'
  | 'dawn'
  | 'tropic'
  | 'rust'
  | 'popsicle'
  | 'dune'
  | 'dusk'
  | 'waves'
  | 'mulberry'
  | 'crimson'
  | 'earth'
  | 'cold'
  | 'burnt'
  | 'candy'
  | 'powder'
  | 'totoro'
  | 'herd'
  | 'autumn'
  | 'beach'
  | 'moonlit'
  | 'vintage';

## Deployment

Deployed on Vercel.

## Tech Stack

* NestJS
* TypeScript
* GitHub REST API
* SVG Rendering
* HTML/CSS/JS

<!-- 
## 📌 Roadmap

* [ ] More themes
* [ ] Layout variations
* [ ] Animation support
* [ ] Better UI customization -->

## Contribution

Feel free to open issues or submit pull requests!

## License

MIT License

## Support

If you found this useful, consider giving it a ⭐ on GitHub!
