import preprocess from 'svelte-preprocess'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { preprocessThrelte } from '@threlte/preprocess'


export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: seqPreprocessor([preprocess(), preprocessThrelte()]),
  ssr: {
		noExternal: ['three', 'troika-three-text']
	}
}
