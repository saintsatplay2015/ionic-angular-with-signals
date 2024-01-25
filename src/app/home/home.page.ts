import { Component, signal, WritableSignal, AfterViewInit } from '@angular/core';
import { IonHeader, 
         IonToolbar, 
         IonTitle, 
         IonContent,
         IonAccordion,
         IonAccordionGroup,
         IonLabel,
         IonItem,
         IonCard,
         IonCardHeader,
         IonCardContent,
         IonCardTitle,
         IonCardSubtitle
       } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, 
            IonToolbar, 
            IonTitle, 
            IonContent,
            IonAccordion,
            IonAccordionGroup,
            IonLabel,
            IonItem,
            IonCard,
            IonCardHeader,
            IonCardContent,
            IonCardTitle,
            IonCardSubtitle],
})
export class HomePage implements AfterViewInit {


  /**
   * @todo Create Interfaces for the array parameters/types
   * 
   * @public
   * @property items
   * @type {WritableSignalArray<{ genre: string, films: Array<{ title: string, description: string, cast: any }> }> | null}
   * @memberof HomePage
   */
  public items: WritableSignal<Array<{ genre: string, films: Array<{ title: string, description: string, cast: any }> }> | null> = signal<Array<{ genre: string, films: Array<{ title: string, description: string, cast: any }> }> | null>(null);


  /**
   * @private
   * @property genres
   * @type {Array<{id: string, description: string}>}
   * @memberof HomePage
   */
  private genres: Array<{id: string, description: string}> = [
    {id: 'Horror', description: 'Scary'},
    {id: 'Space', description: 'Vast'},
    {id: 'Comedy', description: 'Funny'}
  ];


  /**
   * @private
   * @property films
   * @type {Array<{ genre: string, title: string, description: string }>}
   * @memberof HomePage
   */
  private films: Array<{ genre: string, title: string, description: string }> = [
    {
      genre: 'Comedy',
      title: 'Austin Powers: International Man of Mystery',
      description: 'Gentleman spy and ladies man Austin Powers must defeat his arch-nemesis Dr Evil'
    },
    {
      genre: 'Horror',
      title: 'Nightmare On Elm Street',
      description: 'Watch out murdered child molester Freddy Kreuger is back for revenge'
    },
    { 
      genre: 'Space',
      title: 'Star Wars',
      description: 'Luke, I am your father....oh wait a minute, that\'s the third film!'
    }
  ];


  /**
   * @private
   * @property cast
   * @type {Array<{ filmId: string, name: string, actor: string, born?:string, nationality?: string, biography?: string}>}
   * @memberof HomePage
   */
  private cast: Array<{ filmId: string, name: string, actor: string, born?:string, nationality?: string, biography?: string}> = [
    {
      filmId: 'Nightmare On Elm Street',
      name: 'Fredy Kreuger',
      actor: 'Robert Englund',
      born: '6th June 1947',
      nationality: 'American',
      biography: 'Famous for playing child killer/slasher maniac Freddy Kreuger'
    },
    {
      filmId: 'Nightmare On Elm Street',
      name: 'Nancy Thompson',
      actor: 'Heather Langenkamp'
    },
    {
      filmId: 'Nightmare On Elm Street',
      name: 'Lt. Thompson',
      actor: 'John Saxon'
    },
    {
      filmId: 'Nightmare On Elm Street',
      name: 'Glen Lantz',
      actor: 'Johnny Depp'
    },
    {
      filmId: 'Nightmare On Elm Street',
      name: 'Tina Gray',
      actor: 'Amanda Wyss'
    }
  ];


  constructor() {
  }


  ngAfterViewInit(): void {
    this.mapSeparateArraysIntoOne();
  }


  /**
   * @private
   * @method mapSeparateArraysIntoOne
   * @returns none
   * @memberof HomePage
   */
  private mapSeparateArraysIntoOne (): void {
    const obj = this.genres.map((genre: { id: string; description: string; }) => {
      const items = Object.assign({}, { genre: genre.id, 
                                        films: this.modifyReturnedDataStructure(this.films, genre) 
                                    });
      return items;  
    });
    obj.map(film => {
      const elem = this.cast.filter(people => film.films.find(( { title }) =>  people.filmId === title));
      film.films.map((film => {
        const match = elem.filter(people => film.title === people.filmId);
        film.cast = this.removeId(match);
      }));
    });
    console.log('Obj', obj);
    this.items.set(obj);
    console.log('Film query:', this.items);
  }


  /**
   * @private
   * @method modifyReturnedDataStructure
   * @param {Array<{ genre: string, title: string, description: string }>} films
   * @param {*} genre
   * @description   Iterates through the supplied films array and returns only those films that match the supplied genre
   * @returns {Array<{ title: string, description: string, cast: any}>}
   * @memberof HomePage
   */
  private modifyReturnedDataStructure(films: Array<{ genre: string, title: string, description: string }>, 
                                      genre: any): Array<{ title: string, description: string, cast: any}> {
    let movies: Array<{ title: string, description: string, cast: any}> = [];
    films.forEach((film: any) => {
      if (film.genre === genre.id) { 
        movies.push({ title: film.title, 
                 description: film.description,
                 cast: null });
      }
    }); 
    this.removeGenre(movies);
    return movies;
  }


  /**
   * @private
   * @method removeGenre
   * @param {Array<any>} arr
   * @description    Removes the genre key from the supplied array
   * @returns {none}
   * @memberof HomePage
   */
  private removeGenre(arr: Array<any>): void {
    arr.forEach((item: any) => {
      if (item?.genre) {
        delete item.genre;
      }
    });
  }


  /**
   * @private
   * @method removeId
   * @param {Array<any>} arr
   * @description    Removes the filmId key from the object in the supplied array
   * @returns {Array<any>}
   * @memberof HomePage
   */
  private removeId(arr: Array<any>): Array<any> {
    arr.forEach((item: any) => {
      if (item?.filmId) {
        delete item.filmId;
      }
    });
    return arr;
  }
}
