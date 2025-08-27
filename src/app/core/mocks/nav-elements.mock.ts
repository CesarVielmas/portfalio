import { IconTextWrapComponent } from "@app/shared/components/icon-text-wrap/icon-text-wrap.component";
import { NavElement} from "../services/interfaces/navElement.config";
import { GlobalStatesService } from "../services/global-states.service";
import { inject, Injectable } from "@angular/core";
import { SomeLanguages } from "../services/interfaces/someLanguages.config";
import { StoryTimeLineConfig } from "../services/interfaces/storyTimeLine.config";
@Injectable({
  providedIn:'root'
})
export class NavHeaderMockProvider{
  private _globalStates:GlobalStatesService = inject(GlobalStatesService);
  private _navElementsMock: NavElement[] = [
  {
    
  }] as NavElement[];
  private _someLanguages:SomeLanguages[] = [
  {
    id: "language_c",
    tittleLanguage: "home_apart.some_languages.TITTLE_LANGUAGE_C",
    contentLanguage: "home_apart.some_languages.CONTENT_LANGUAGE_C",
    percentageUsage:'15%',
    urlImage: "assets/png/c_logo.png"
  },
  {
    id: "language_cpp",
    tittleLanguage: "home_apart.some_languages.TITTLE_LANGUAGE_CPP",
    contentLanguage: "home_apart.some_languages.CONTENT_LANGUAGE_CPP",
    percentageUsage:'30%',
    urlImage: "assets/png/cpp_logo.png"
  },
  {
    id: "language_python",
    tittleLanguage: "home_apart.some_languages.TITTLE_LANGUAGE_PYTHON",
    contentLanguage: "home_apart.some_languages.CONTENT_LANGUAGE_PYTHON",
    percentageUsage:'45%',
    urlImage: "assets/png/python_logo.png"
  },
  {
    id: "language_javascript",
    tittleLanguage: "home_apart.some_languages.TITTLE_LANGUAGE_JAVASCRIPT",
    contentLanguage: "home_apart.some_languages.CONTENT_LANGUAGE_JAVASCRIPT",
    percentageUsage:'85%',
    urlImage: "assets/png/javascript_logo.png"
  },
  {
    id: "language_typescript",
    tittleLanguage: "home_apart.some_languages.TITTLE_LANGUAGE_TYPESCRIPT",
    contentLanguage: "home_apart.some_languages.CONTENT_LANGUAGE_TYPESCRIPT",
    percentageUsage:'70%',
    urlImage: "assets/png/typescript_logo.png"
  },
  {
    id: "language_csharp",
    tittleLanguage: "home_apart.some_languages.TITTLE_LANGUAGE_CSHARP",
    contentLanguage: "home_apart.some_languages.CONTENT_LANGUAGE_CSHARP",
    percentageUsage:'90%',
    urlImage: "assets/png/csharp_logo.png"
  },
  {
    id: "language_kotlin",
    tittleLanguage: "home_apart.some_languages.TITTLE_LANGUAGE_KOTLIN",
    contentLanguage: "home_apart.some_languages.CONTENT_LANGUAGE_KOTLIN",
    percentageUsage:'35%',
    urlImage: "assets/png/kotlin_logo.png"
  },
  {
    id: "language_r",
    tittleLanguage: "home_apart.some_languages.TITTLE_LANGUAGE_R",
    contentLanguage: "home_apart.some_languages.CONTENT_LANGUAGE_R",
    percentageUsage:'5%',
    urlImage: "assets/png/r_logo.png"
  },
  {
    id: "language_sql",
    tittleLanguage: "home_apart.some_languages.TITTLE_LANGUAGE_SQL",
    contentLanguage: "home_apart.some_languages.CONTENT_LANGUAGE_SQL",
    percentageUsage:'70%',
    urlImage: "assets/png/sql_logo.png"
  },
  {
    id: "language_java",
    tittleLanguage: "home_apart.some_languages.TITTLE_LANGUAGE_JAVA",
    contentLanguage: "home_apart.some_languages.CONTENT_LANGUAGE_JAVA",
    percentageUsage:'5%',
    urlImage: "assets/png/java_logo.webp"
  }] as SomeLanguages[];
  private _someTechnologys: Record<string, any>[] = [
    {
      id: 'react',
      urlImage: 'assets/svg/icon_react.svg',
      contentText: 'React',
      functionToDo:()=>{this._globalStates.navigateTo('/projects#web#react')}
    },
    {
      id: 'angular',
      urlImage: 'assets/svg/icon_angular.svg',
      contentText: 'Angular',
      functionToDo: ()=>{this._globalStates.navigateTo('/projects#web#angular')}
    },
    {
      id: 'vuejs',
      urlImage: 'assets/svg/icon_vue.svg',
      contentText: 'Vue.js',
      functionToDo: ()=>{this._globalStates.navigateTo('/projects#web#vue-js')}
    },
    {
      id: 'blazor',
      urlImage: 'assets/svg/icon_blazor.svg',
      contentText: 'Blazor',
      functionToDo: ()=>{this._globalStates.navigateTo('/projects#web#blazor')}
    },
    {
      id: 'dotnet_maui',
      urlImage: 'assets/svg/icon_dotnet_maui.svg',
      contentText: '.NET MAUI',
      functionToDo: ()=>{this._globalStates.navigateTo('/projects#desktop#net-maui')}
    },
    {
      id: 'android_studio',
      urlImage: 'assets/svg/icon_android.svg',
      contentText: 'Android Studio',
      functionToDo: ()=>{this._globalStates.navigateTo('/projects#mobile#react')}
    },
    {
      id: 'react_native',
      urlImage: 'assets/svg/icon_react.svg',
      contentText: 'React Native',
      functionToDo: ()=>{this._globalStates.navigateTo('/projects#mobile#react-native')}
    },
    {
      id: 'dotnet',
      urlImage: 'assets/svg/icon_dotnet.svg',
      contentText: '.NET',
      functionToDo: ()=>{this._globalStates.navigateTo('/projects#backend#net')}
    },
    {
      id: 'sql_server',
      urlImage: 'assets/svg/icon_sql_server.svg',
      contentText: 'SQL Server',
      functionToDo: ()=>{}
    },
    {
      id: 'sqlite',
      urlImage: 'assets/svg/icon_sql_lite.svg',
      contentText: 'SQLite',
      functionToDo: () => {}
    },
    {
      id: 'mysql',
      urlImage: 'assets/svg/icon_my_sql.svg',
      contentText: 'MySQL',
      functionToDo: () => {}
    },
    {
      id: 'mongodb',
      urlImage: 'assets/svg/icon_mongo_db.svg',
      contentText: 'MongoDB',
      functionToDo: () => {}
    },
    {
      id: 'wpf',
      urlImage: 'assets/svg/icon_wpf.svg',
      contentText: 'WPF',
      functionToDo: ()=>{this._globalStates.navigateTo('/projects#desktop#wpf')}
    }
  ];
  private _someTools: Record<string, any>[] = [
    {
      id: 'visual_studio',
      urlImage: 'assets/svg/icon_visual_studio.svg',
      contentText: 'Visual Studio',
      functionToDo: null
    },
    {
      id: 'visual_studio_code',
      urlImage: 'assets/svg/icon_visual_studio_code.svg',
      contentText: 'Visual Studio Code',
      functionToDo: null
    },
    {
      id: 'docker',
      urlImage: 'assets/svg/icon_docker.svg',
      contentText: 'Docker',
      functionToDo: null
    },
    {
      id: 'postman',
      urlImage: 'assets/svg/icon_postman.svg',
      contentText: 'Postman',
      functionToDo: null
    },
    {
      id: 'microsoft_office',
      urlImage: 'assets/svg/icon_microsoft_office.svg',
      contentText: 'Microsoft Office',
      functionToDo: null
    },
    {
      id: 'bun',
      urlImage: 'assets/svg/icon_bun.svg',
      contentText: 'Bun',
      functionToDo: null
    },
    {
      id: 'npm',
      urlImage: 'assets/svg/icon_npm.svg',
      contentText: 'npm',
      functionToDo: null
    },
    {
      id: 'git',
      urlImage: 'assets/svg/icon_git.svg',
      contentText: 'Git',
      functionToDo: null
    },
    {
      id: 'github',
      urlImage: 'assets/svg/icon_github.svg',
      contentText: 'GitHub',
      functionToDo: null
    },
    {
      id: 'gitlab',
      urlImage: 'assets/svg/icon_gitlab.svg',
      contentText: 'GitLab',
      functionToDo: null
    }
  ];
  private _timeLineStorysES:StoryTimeLineConfig[]=[
      {
      id: 'story_1',
      yearStory: new Date(2019, 0, 1),
      tittleStory: 'Primer acercamiento al desarrollo web',
      optionalImageUrl: 'assets/png/story_1.png',
      contentStory: 'Durante la preparatoria descubrí HTML y CSS. Al principio me parecía algo complejo, pero pronto me di cuenta de que podía crear páginas web básicas. Fue la primera vez que sentí la emoción de transformar ideas en algo visual y funcional en una pantalla.'
    },
    {
      id: 'story_2',
      yearStory: new Date(2019, 6, 1),
      tittleStory: 'Primeros proyectos personales',
      optionalImageUrl: 'assets/png/story_2.png',
      contentStory: 'Comencé a experimentar por mi cuenta, creando pequeños portafolios y páginas estáticas que compartía con amigos. Aunque simples, me permitieron practicar la estructura de HTML, el diseño con CSS y los primeros pasos con JavaScript.'
    },
    {
      id: 'story_3',
      yearStory: new Date(2020, 0, 1),
      tittleStory: 'Introducción a la programación orientada a objetos',
      optionalImageUrl: 'assets/png/story_3.png',
      contentStory: 'En la universidad conocí Java, C++ y C. Aprendí conceptos como clases, objetos y herencia. Aunque al inicio resultó difícil, poco a poco entendí cómo aplicar la lógica para resolver problemas reales. Fue el primer contacto con programación más estructurada.'
    },
    {
      id: 'story_4',
      yearStory: new Date(2020, 6, 1),
      tittleStory: 'Proyectos de consola',
      optionalImageUrl: 'assets/png/story_4.png',
      contentStory: 'Desarrollé mis primeros programas de terminal: desde calculadoras hasta sistemas de gestión básicos. Estos proyectos me ayudaron a mejorar mi lógica, aprender a depurar errores y a perder el miedo a escribir más código.'
    },
    {
      id: 'story_5',
      yearStory: new Date(2021, 0, 1),
      tittleStory: 'Proyectos completos y primeras soluciones funcionales',
      optionalImageUrl: 'assets/png/story_5.png',
      contentStory: 'Creé pequeños sistemas como puntos de venta y aplicaciones de escritorio sencillas. Aunque no eran profesionales, tenían una estructura completa. Esta etapa me enseñó que podía desarrollar software que realmente cumpliera un propósito.'
    },
    {
      id: 'story_6',
      yearStory: new Date(2022, 0, 1),
      tittleStory: 'Explorando bases de datos',
      optionalImageUrl: 'assets/png/story_6.png',
      contentStory: 'Comencé a trabajar con bases de datos como MySQL y SQL Server. Aprendí a diseñar tablas, consultas y relaciones, entendiendo cómo se integraban con aplicaciones. Este aprendizaje abrió la puerta a proyectos más realistas y útiles.'
    },
    {
      id: 'story_7',
      yearStory: new Date(2023, 0, 1),
      tittleStory: 'Ampliando horizontes con frameworks y nuevas tecnologías',
      optionalImageUrl: 'assets/png/story_7.png',
      contentStory: 'Estudié C#, JavaScript y frameworks como Angular y React. Además, exploré el desarrollo backend con .NET y el desarrollo móvil y desktop. Esta fue una etapa de gran crecimiento técnico, donde entendí que el desarrollo de software abarcaba muchos ámbitos más allá del web.'
    },
    {
      id: 'story_8',
      yearStory: new Date(2024, 0, 1),
      tittleStory: 'Primera experiencia profesional como practicante',
      optionalImageUrl: 'assets/png/story_8.png',
      contentStory: 'Ingresé a una empresa como practicante, desarrollando proyectos con tecnologías como Blazor, Web Forms, WPF, SharePoint y Python para automatización. Fue mi primer contacto con proyectos de nivel empresarial, lo que me enseñó la importancia del trabajo en equipo y de seguir estándares profesionales.'
    },
    {
      id: 'story_9',
      yearStory: new Date(2024, 6, 1),
      tittleStory: 'Automatización y optimización',
      optionalImageUrl: 'assets/png/story_9.png',
      contentStory: 'Trabajé en la creación de bots automáticos con Python y en la generación de reportes automatizados utilizando librerías especializadas. Esta etapa me mostró cómo la programación puede ahorrar tiempo y recursos a las empresas mediante la automatización de procesos repetitivos.'
    },
    {
      id: 'story_10',
      yearStory: new Date(2025, 0,1),
      tittleStory: 'Consolidación profesional y visión a futuro',
      optionalImageUrl: 'assets/png/story_10.png',
      contentStory: 'Actualmente me encuentro desarrollando proyectos con un enfoque más profesional: aplicando arquitecturas, patrones de diseño y buenas prácticas. He trabajado con frameworks como Vue.js y he aprendido a estructurar proyectos para que sean escalables, robustos y fáciles de mantener. Más que solo hacer que el código funcione, ahora me enfoco en que el software sea sostenible y de calidad a largo plazo.'
    }
  ] as StoryTimeLineConfig[];
  private _timeLineStorysEN: StoryTimeLineConfig[] = [
    {
      id: 'story_1',
      yearStory: new Date(2019, 0, 1),
      tittleStory: 'First approach to web development',
      optionalImageUrl: 'assets/png/story_1.png',
      contentStory: 'During high school, I discovered HTML and CSS. At first, it seemed complex, but soon I realized I could create basic web pages. It was the first time I felt the excitement of turning ideas into something visual and functional on a screen.'
    },
    {
      id: 'story_2',
      yearStory: new Date(2019, 6, 1),
      tittleStory: 'First personal projects',
      optionalImageUrl: 'assets/png/story_2.png',
      contentStory: 'I started experimenting on my own, creating small portfolios and static pages to share with friends. Although simple, they allowed me to practice HTML structure, CSS design, and take my first steps with JavaScript.'
    },
    {
      id: 'story_3',
      yearStory: new Date(2020, 0, 1),
      tittleStory: 'Introduction to object-oriented programming',
      optionalImageUrl: 'assets/png/story_3.png',
      contentStory: 'At university, I learned Java, C++ and C. I studied concepts such as classes, objects, and inheritance. Although challenging at first, I gradually understood how to apply logic to solve real-world problems. This was my first contact with more structured programming.'
    },
    {
      id: 'story_4',
      yearStory: new Date(2020, 6, 1),
      tittleStory: 'Console projects',
      optionalImageUrl: 'assets/png/story_4.png',
      contentStory: 'I developed my first terminal programs: from calculators to basic management systems. These projects helped me improve my logic, learn how to debug errors, and lose the fear of writing more code.'
    },
    {
      id: 'story_5',
      yearStory: new Date(2021, 0, 1),
      tittleStory: 'Complete projects and first functional solutions',
      optionalImageUrl: 'assets/png/story_5.png',
      contentStory: 'I created small systems such as point of sale and simple desktop applications. Even though they were not professional, they had a complete structure. This stage taught me that I could develop software that truly served a purpose.'
    },
    {
      id: 'story_6',
      yearStory: new Date(2022, 0, 1),
      tittleStory: 'Exploring databases',
      optionalImageUrl: 'assets/png/story_6.png',
      contentStory: 'I started working with databases like MySQL and SQL Server. I learned to design tables, queries, and relationships, understanding how they integrated with applications. This knowledge opened the door to more realistic and useful projects.'
    },
    {
      id: 'story_7',
      yearStory: new Date(2023, 0, 1),
      tittleStory: 'Expanding horizons with frameworks and new technologies',
      optionalImageUrl: 'assets/png/story_7.png',
      contentStory: 'I studied C#, JavaScript, and frameworks such as Angular and React. I also explored backend development with .NET, as well as mobile and desktop development. This was a stage of great technical growth, where I understood that software development went far beyond the web.'
    },
    {
      id: 'story_8',
      yearStory: new Date(2024, 0, 1),
      tittleStory: 'First professional experience as an intern',
      optionalImageUrl: 'assets/png/story_8.png',
      contentStory: 'I joined a company as an intern, working on projects with technologies like Blazor, Web Forms, WPF, SharePoint, and Python for automation. It was my first contact with enterprise-level projects, teaching me the importance of teamwork and following professional standards.'
    },
    {
      id: 'story_9',
      yearStory: new Date(2024, 6, 1),
      tittleStory: 'Automation and optimization',
      optionalImageUrl: 'assets/png/story_9.png',
      contentStory: 'I worked on creating automated bots with Python and generating automated reports using specialized libraries. This stage showed me how programming can save companies time and resources by automating repetitive processes.'
    },
    {
      id: 'story_10',
      yearStory: new Date(2025, 0, 1),
      tittleStory: 'Professional consolidation and vision for the future',
      optionalImageUrl: 'assets/png/story_10.png',
      contentStory: 'Currently, I am developing projects with a more professional focus: applying architectures, design patterns, and best practices. I have worked with frameworks like Vue.js and learned to structure projects so that they are scalable, robust, and easy to maintain. More than just making code work, I now focus on ensuring that software is sustainable and high-quality in the long term.'
    }
  ] as StoryTimeLineConfig[];

  get navElementMock():NavElement[]{
    return this._navElementsMock;
  }
  get someLanguages():SomeLanguages[]{
    return this._someLanguages;
  }
  get someTechnologys():Record<string,any>[]{
    return this._someTechnologys;
  }
  get someTools():Record<string,any>[]{
    return this._someTools;
  }
  getTimeLineStorys(lang: string): StoryTimeLineConfig[] {
    let stories: StoryTimeLineConfig[];
    switch (lang.toLowerCase()) {
      case 'en':
        stories = this._timeLineStorysEN;
        break;
      case 'es':
        stories = this._timeLineStorysES;
        break;
      default:
        stories = this._timeLineStorysEN; 
        break;
    }
    return stories
      .slice()
      .sort((a, b) => a.yearStory.getTime() - b.yearStory.getTime());
  }

} 

 