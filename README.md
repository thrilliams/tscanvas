<p align="center">
    <h1 align="center">TScanvas</h1>
</p>
<p align="center">
<a href="https://github.com/thrilliams"><img src="https://img.shields.io/badge/created%20by-@thrilliams-purple" alt="Author"></a>
<a href="https://github.com/thrilliams/tscanvas/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/thrilliams/tscanvas"></a>
</p>
<p align="center">
a simple wrapper for the canvas lms api.
</p>
<p align="center">
powered by <a href="https://github.com/colinhacks/zod">Zod</a>!
</p>

```JavaScript
import { Canvas } from 'tscanvas';

let canvas = new Canvas('123456789acbdef123456789acbdef123456789acbdef123456789acbdef123456789');

canvas.getAssignments().then(console.log);
```

### Notes and warnings
This project exists solely as an internal tool and will likely never have complete coverage over the Canvas API. It is not recommended that you use this in production applications.
