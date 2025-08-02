import { IconTextWrapComponent } from "@app/shared/components/icon-text-wrap/icon-text-wrap.component";
import { NavElement} from "../services/interfaces/navElement.config";
import { GlobalStatesService } from "../services/global-states.service";
import { inject, Injectable } from "@angular/core";
import { SomeLanguages } from "../services/interfaces/someLanguages.config";
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
} 

 