import { Post } from '../interfaces/post';

export const POSTS: Post[] = [
    { 
      id: 1, 
      date: new Date("2019-01-16"), 
      title: 'Post 1', 
      content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <i>Vestibulum eget odio vel urna congue cursus a nec massa.</i> Sed scelerisque odio ut sollicitudin venenatis. Integer hendrerit turpis a felis malesuada, vel feugiat erat cursus. Suspendisse potenti. Nullam nec neque at tellus congue luctus. Nullam in justo sed nunc fermentum volutpat. Nullam vitae erat eros. Phasellus feugiat tellus sit amet dui imperdiet, a faucibus mauris bibendum. Fusce non eros sit amet nisl auctor feugiat id at ante.</p>'
    },
    { 
      id: 2, 
      date: new Date("2019-01-17"), 
      title: 'Post 2', 
      content: 'Praesent vel eros non est vehicula cursus. Curabitur tincidunt libero a justo tincidunt dictum. Sed suscipit nunc sed massa venenatis, in tristique lectus interdum. Vivamus a facilisis velit. Vestibulum dignissim eros nec dolor volutpat, ac bibendum elit venenatis. Pellentesque nec mi ut justo posuere varius. Aenean nec velit non sem ultrices fringilla. Curabitur luctus tortor vel nibh tristique iaculis. Proin ut arcu in ex laoreet cursus. Duis feugiat, sapien non dignissim eleifend, mauris lectus blandit nulla, ut accumsan tortor urna nec est.'
    },
    { 
      id: 3, 
      date: new Date("2019-01-18"), 
      title: 'Post 3', 
      content: 'Aliquam eu dolor at metus rhoncus lacinia. Curabitur ac ultricies tortor. Sed non varius velit. Etiam malesuada metus nec nunc scelerisque, sit amet convallis elit blandit. Fusce venenatis justo in neque varius egestas. Nulla facilisi. Morbi volutpat nisl eu felis scelerisque, a bibendum nisi iaculis. Fusce scelerisque, mi sit amet interdum vestibulum, tortor odio blandit purus, a laoreet lorem arcu sit amet lectus. Integer rhoncus purus id arcu tristique venenatis. Suspendisse a justo at ex congue iaculis vel nec justo.'
    },
    { 
      id: 4, 
      date: new Date("2019-01-19"), 
      title: 'Post 4', 
      content: 'Nam facilisis justo eu dapibus interdum. Sed ut cursus ante. Vestibulum ultrices, massa eu finibus iaculis, nisl urna volutpat leo, at ullamcorper odio ante nec nunc. Maecenas feugiat ligula non leo interdum, a vehicula nulla tristique. Vivamus a purus id orci pellentesque scelerisque non id arcu. In hac habitasse platea dictumst. Nam cursus purus vel eleifend congue. Nulla facilisi. Sed feugiat lectus vel felis gravida, nec varius nisl lacinia. Aenean ut ex metus.'
    },
  ];