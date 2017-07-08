{{##
    def.$layout = "article";
    def.disqusId = "17-07-webgl";
    def.title = "Which WebGL library to choose?";
    def.lead = "Different WebGL libraries offer very different levels of abstractions. Which one is right for you?";
    def.tags = ["webgl"];
    def.isBlog = true;
    def.date = new Date(2017, 6, 8);
#}}

Over the last six months I've used several libraries with WebGL. I'm therefore in no way an expert on Opengl ES2, WebGL or any of the library presented here. However, I think I've used them enough to be able to give you a quick overview, which tool is suitable for which job.

I will start with (almost) barebones WebGL and gradually move up to more convenient and beefy library.

# Bare metal WebGL with only GLMatrix

## Example


### Formats
Only what you write yourself (or get a library)

## Features
* Payload (minified): 


## When to use it?
Main reason: To learn OpenGL ES2. Using pure WebGL is a great way of getting into modern OpenGL, especially when you don't have the C/C++ or Mobile background. The syntax is very similar to real OpenGL but you don't have to worry about pointers, loading image formats or setting up a host for the GL context. It also gives you a friendly environment to experiment with shaders.

There is very little reason to use pure WebGL outside of this unless you really know what you're doing and want to write your own WebGL library (and even then you might be better of with contributing to one of the other libraries presented here).

# TWGL.js
TWGL is just syntactic suger for writing bare metal WebGL, with a few convenience methods sprinkled in. The abstraction seem very well thought about and you still feel that you have total control over all WebGL features. And even if a particular feature is missing, it is always possible to mix and match with vanilla WebGL

## When to use it?
I would recommend using TWGL for all jobs that require total WebGL control, especially if you already know WebGL/ES2 and just want to get rid of the verbosity.
This would most likely apply to small (shader) experiments or you are using WebGL as a rasterizer to do non-3D things and shader experiments.
For example I'm using TWGL for my retro-gl project, which can render in 8-bit color mode and has a fixed texture resolution of 256 * 256.  

# THREE JS


# Babylon.js
