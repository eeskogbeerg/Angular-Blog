import { Injectable } from '@angular/core';
import { BlogPost } from './blog.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  // Flag indicating if the user is in owner's perspective
  private ownerPerspective: boolean = true;

  // Default about content for the blog
  private aboutContent: string =
    'Hi there! I’m Jane Doe, the creator of this blog. I’m passionate about sharing my knowledge and experiences with the world. This blog is a platform for me to express my thoughts and connect with people who share similar interests';

  // Array holding all blog posts
  private blogPosts: BlogPost[] = [];

  private hardcodedPosts: BlogPost[] = [];

  // Constructor to initialize the service with existing data
  constructor(private router: Router) {
    // Load existing blog posts from localStorage during service initialization
    this.getBlogPostsFromLocalStorage();

    // Add some hardcoded blog posts for testing
    this.addHardcodedBlogPosts();
  }

  private addHardcodedBlogPosts() {
    const hardcodedPosts: BlogPost[] = [
      {
        id: 1,
        title: 'Börja ge mat till sitt barn',
        thumbnailUrl: 'https://res.cloudinary.com/hero-global/image/upload/ar_430:430,c_fill,dpr_1.0,f_auto,fl_lossy,g_auto,q_auto/v1/Semper/2021-01/Header_Oat_Meal',
        secondImageUrl: 'https://tse1.mm.bing.net/th?id=OIP.08auJJ1EhpCLV6d78IeEHgHaE8&pid=Api&P=0&h=180',
        body: 'Din lilla bebis är redo för fast föda, och du kanske föredrar att göra din egen bebismat istället för att köpa färdig barnmat. Hemlagad bebismat kan vara lika god och näringsrik som versionen du köper i butik, och ger barnet all den näring han eller hon behöver för att växa ordentligt. Och om du tycker om att laga mat är detta ett utmärkt sätt för dig att vidga dina kulinariska vyer. ',
        creationDate: new Date(),
        likes: 0,
        dislikes: 0,
        comments: [],
      },
      {
        id: 2,
        title: 'Havregröt 4 mån',
        thumbnailUrl: 'https://www.minimat.se/wp-content/uploads/2020/01/IMG_3765-scaled-e1579781382660.jpg',
        secondImageUrl: 'https://tse2.mm.bing.net/th?id=OIP.Xp8wcqLDf94UPXX2ORsA0gHaHa&pid=Api&P=0&h=180',
        body: 'Hemmagjord, järnberikad bebisgröt är enkelt att göra och, enligt testpanelen bestående av dottern, mycket godare än köpegröt. Denna variant är gjord på frön samt havregryn och grötpulvret håller flera månader om du har det i en lufttät burk',
        creationDate: new Date(),
        likes: 0,
        dislikes: 0,
        comments: [],
      },
      {
        id: 3,
        title: 'Potatis med köttgryta 6 mån',
        thumbnailUrl: 'https://res.cloudinary.com/hero-global/image/upload/ar_430:430,c_fill,dpr_1.0,f_auto,fl_lossy,g_auto,q_auto,w_1024/v1/Semper/2021-01/potatis_med_kottgryta_recept_6M_1558x694',
        secondImageUrl: 'https://tse4.mm.bing.net/th?id=OIP.14Fg7K2NYDsjWQcylCehjQHaE0&pid=Api&P=0&h=180',
        body: 'Potatis med köttgryta är en populär barnmåltid med uppskattade ingredienser som morot och majs. Utmärkt recept för stunder då du vill laga egen barnmat. Måltiden passar barn från 6 månader.',
        creationDate: new Date(),
        likes: 0,
        dislikes: 0,
        comments: [],
      },        
      {
        id: 4,
        title: 'Pasta med köttfärssås, från 6 månader',
        thumbnailUrl: 'https://cdn.pixabay.com/photo/2016/08/06/20/15/mozzarella-1575066_640.jpg',
        secondImageUrl: 'https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_216454/cf_259/spaghetti_napoli_med_linser_.jpg',
        body: 'Enkel pasta med gräddig köttfärssås. Det tar inte många minuter att slänga ihop detta och det blir så gott! Fullkornspasta innehåller mer järn än vanlig vit pasta och ger goda fibrer till tarmfloran. Har man en bebis som är lös i magen eller lätt blir mätt snabbt, så kan man köra vanlig vit pasta. ',
        creationDate: new Date(),
        likes: 0,
        dislikes: 0,
        comments: [],
      },
    ];
    hardcodedPosts.forEach(post => this.addBlogPost(post));
  }

  getHardcodedBlogPosts(): BlogPost[] {
    return this.hardcodedPosts;
  }

  // Set the owner perspective
  setOwnerPerspective(isOwner: boolean) {
    this.ownerPerspective = isOwner;
  }

  // Check if the user is in the owner's perspective
  isOwnerPerspective(): boolean {
    return this.ownerPerspective;
  }

  // Get a specific blog post by ID
  getBlogPostById(id: number): BlogPost | undefined {
    console.log('Trying to find blog post with ID:', id);
    if (id === undefined) {
      console.error('Invalid ID:', id);
      return undefined;
    }
    const foundPost = this.blogPosts.find(post => post.id === id);
    console.log('Found Post:', foundPost);
    return foundPost;
  }
  
  // Get all blog posts
  getBlogPosts(): BlogPost[] {
    try {
      console.log('Fetching blog posts from localStorage...');

      // Fetch posts from localStorage
      const localStoragePosts = this.getBlogPostsFromLocalStorage();

      // Update the in-memory blogPosts array
      this.blogPosts = localStoragePosts;

      return localStoragePosts;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  // Helper function to fetch blog posts from localStorage
  private getBlogPostsFromLocalStorage(): BlogPost[] {
    const storedPosts = localStorage.getItem('blogPosts');

    if (storedPosts) {
      return JSON.parse(storedPosts);
    }

    return [];
  }

  // Add a new blog post
  addBlogPost(post: BlogPost | { id: number, secondImageUrl?: string }) {
    // If only an id is provided, generate a complete BlogPost object
    const postId = 'id' in post ? post.id : this.generateUniqueId();
  
    // Destructure properties from post object or provide default values
    const {
      title = '',
      thumbnailUrl = '',
      secondImageUrl = '',
      body = '',
      creationDate,
      likes = 0,
      dislikes = 0,
      comments = [],
    } = post as BlogPost;

  // Push the new post to the blogPosts array
  this.blogPosts.push({
    id: postId,
    title,
    thumbnailUrl,
    secondImageUrl,
    body,
    creationDate,
    likes,
    dislikes,
    comments,
    
  });
    
    this.saveToLocalStorage();
    console.log('Added blog post:', post);

    // Check if creationDate is not provided and set it to the current date
  const postCreationDate = creationDate || new Date();
  }

  // Get the about content for the blog
  getAboutContent(): string {
    return this.aboutContent;
  }

  // Save blog posts and about content to localStorage
  saveToLocalStorage() {
    console.log('Saving blog posts to localStorage:', this.blogPosts);
    localStorage.setItem('blogPosts', JSON.stringify(this.blogPosts));
    localStorage.setItem('aboutContent', this.aboutContent);
  }

  // Save new about content
  saveAboutContent(content: string) {
    this.aboutContent = content;
    this.saveToLocalStorage();
  }

  // Generate a unique ID based on timestamp and a random number
  generateUniqueId(): number {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000) + 1;
    const uniqueId = timestamp * 1000 + random;
    console.log('Generated unique ID:', uniqueId);
    return uniqueId;
  }
  //Delete blogpost
  removeBlogPost(postId: number) {
    this.blogPosts = this.blogPosts.filter(post => post.id !== postId);
    this.saveToLocalStorage();
  }
}

