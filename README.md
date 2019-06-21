# Extend-BPjs
This project is about extending BPjs with 2 new functions: 
1. *block* 
```
    // e is implicitly blocked in each bsync in the contained block.`
       block(e).in( function () {`
          bp.sync({...});
          bp.sync({...});
       })
```
2. *breakupon*
```
    // e is implicitly waited-for in each bsync in the contained block.
    // when it is triggered the block is aborted (as if there is an exception).
       breakupon(e).in( function () {
          bp.sync({...});
          bp.sync({...});
       }).catch(e, function () {
          // Something to do when e breaks the execution...
       })
```

All explanations about the code can be found in 'extend BPjs.pptx'.

More information about BPjs can be found here-

* https://github.com/bThink-BGU/BPjs
* https://bpjs.readthedocs.io/

