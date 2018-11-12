#pragma warning disable 169
// ReSharper disable RedundantIfElseBlock
// ReSharper disable MemberCanBeProtected.Global
// ReSharper disable MemberCanBePrivate.Global
using System;
using System.Collections.Generic;
using System.Linq;
using Vector=System.Windows.Media.Media3D.Vector3D;

class Help
{
    public static Vector norm(Vector v1)
    {
        return v1/v1.Length;
    }
}

public struct Color
{
    public float r, g, b;

    public Color(float r,float g,float b)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    public static Color operator +(Color v1, Color v2)
    {
        return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b);
    }
    public static Color operator -(Color v1, Color v2)
    {
        return new Color(v1.r - v2.r, v1.g - v2.g, v1.b - v2.b);
    }
    public static Color operator *(Color v1, Color v2)
    {
        return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b);
    }
    public static Color operator *(float v1, Color v2)
    {
        return new Color(v1 * v2.r, v1 * v2.g, v1 * v2.b);
    }

    public static implicit operator Color(System.Windows.Media.Color c)
    {
        return new Color(c.R / 255f, c.G / 255f, c.B / 255f);
    }
    public static implicit operator System.Windows.Media.Color(Color c)
    {
        
        var legalize = new Func<float, float>(d => d > 1 ? 1 : d);
        return System.Windows.Media.Color.FromRgb(
            r: (byte) (legalize(c.r)*255), g: (byte) (legalize(c.g)*255),
            b: (byte) (legalize(c.b)*255)
            );

    }

    public static Color white = new Color(1.0f, 1.0f, 1.0f);
    public static Color grey = new Color(0.5f, 0.5f, 0.5f);
    public static Color black = new Color(0.0f, 0.0f, 0.0f);
    public static Color background = black;
    public static Color defaultColor = black;
}

public class Camera {
    public  Vector forward;
    public  Vector right;
    public  Vector up;
    public Vector pos;

    public Camera(Vector pos, Vector lookAt)
    {
        var down = new Vector(0.0, -1.0, 0.0);
        forward = Help.norm(lookAt - pos);
        right = 1.5*Help.norm(Vector.CrossProduct(forward, down));
        up = 1.5*Help.norm(Vector.CrossProduct(forward, right));
    }
}

public class Ray {
    public Vector start;
    public Vector dir;
}

public class Intersection
{
    public Thing thing;
    public Ray ray;
    public float dist;
}

public abstract class Thing
{
    public abstract Intersection intersect(Ray ray);
    public abstract Vector normal(Vector pos);

    public Surface surface;
    protected Thing(Surface surface)
    {
        this.surface = surface;
    }

    public Vector pos { get; set; }
}

public class Light {
    public Vector pos { get; set; }
    public Color color { get; set; }
}

public class Scene
{
   public List<Thing> things;
    public List<Light> lights;
    public Camera camera;
}

class Sphere : Thing
{

    public readonly float radius2;
    public Vector center;
    public float radius;

    public Sphere(Vector center, float radius, Surface surface) : base(surface)
    {
        this.center = center;
        this.radius = radius;
        this.surface = surface;
        radius2 = radius * radius;
    }
    public override Vector normal( Vector pos) { return Help.norm(Vector.Add(pos, -center)); }
    public override Intersection intersect(Ray ray) {
        var eo = Vector.Add(center, -ray.start);
        var v = Vector.DotProduct(eo, ray.dir);
        var dist = 0.0f;
        if (v >= 0) {
            var disc = radius2 - (Vector.DotProduct(eo, eo) - v * v);
            if (disc >= 0) {
                dist = (float) (v - Math.Sqrt(disc));
            }
        }
        if (Math.Abs(dist) < 1e-5) {
            return null;
        }
        return new Intersection {thing = this, ray = ray, dist = dist};
    }
}

class Plane : Thing {
    
    public override Intersection intersect(Ray ray)
    {
        var denom = Vector.DotProduct(norm, ray.dir);
        if (denom > 0)
            return null;
        else
        {
            var dist = (Vector.DotProduct(norm, ray.start) + offset)/(-denom);
            return new Intersection {thing = this, ray = ray, dist = (float) dist};
        }
    }

    public override Vector normal(Vector pos)
    {
        return norm;
    }

    private readonly Vector norm;
    public readonly float offset;

    public Plane(Vector norm,float offset,Surface surface) : base(surface)
    {
        this.norm = norm;
        this.offset = offset;
    }
}
public abstract class Surface
{
    public abstract Color diffuse(Vector pos);
    public abstract Color specular(Vector pos);

    public abstract float reflect(Vector pos);

    public float roughness;

    protected Surface(float roughness)
    {
        this.roughness = roughness;
    }
}

public class shiny:Surface
{
    public shiny() : base(250)
    {
    }

    #region Overrides of Surface

    public override Color diffuse(Vector pos)
    {
        return Color.white;
    }

    public override Color specular(Vector pos)
    {
        return Color.grey;
    }

    public override float reflect(Vector pos)
    {
        return 0.7f;
    }

    #endregion
}

class checkerboard:Surface
{
    public checkerboard() : base(150)
    {
    }

    #region Overrides of Surface

    public override Color diffuse(Vector pos)
    {
        if (Math.Abs((pos.Z + pos.X)%2) > 1e-6)
        {
            return Color.white;
        }
        else
        {
            return Color.black;
        }
    }

    public override Color specular(Vector pos)
    {
        return Color.white;
    }

    public override float reflect(Vector pos)
    {
        if (Math.Abs((Math.Floor(pos.Z + pos.X))%2) > 1e-6)
        {
            return 0.1f;
        }
        else
        {
            return 0.7f;
        }
    }

    #endregion
}


public class RayTrace
{
    private const int maxDepth = 5;

    private Intersection intersections(Ray ray, Scene scene)
    {
        var closest = float.PositiveInfinity;
        Intersection closestInter = null;
        foreach (var thing in scene.things)
        {
            var inter = thing.intersect(ray);
            if (inter != null && inter.dist < closest)
            {
                closestInter = inter;
                closest = inter.dist;
            }
        }
        return closestInter;
    }

    private float testRay(Ray ray, Scene scene)
    {
        var isect = intersections(ray, scene);
        if (isect != null)
        {
            return isect.dist;
        }
        else
        {
            return -1f;
        }
    }

    private Color traceRay(Ray ray, Scene scene, float depth)
    {
        var isect = intersections(ray, scene);
        if (isect == null)
        {
            return Color.background;
        }
        else
        {
            return shade(isect, scene, depth);
        }
    }

    private Color shade(Intersection isect, Scene scene, float depth)
    {
        var d = isect.ray.dir;
        var pos = isect.dist*d + isect.ray.start;
        var normal = isect.thing.normal(pos);
        var reflectDir = d - 2*(Vector.DotProduct(normal, d)*normal);
        var naturalColor = Color.background +
                           getNaturalColor(isect.thing, pos, normal, reflectDir, scene);
        var reflectedColor = (depth >= maxDepth)
            ? Color.grey
            : getReflectionColor(isect.thing, pos, normal, reflectDir, scene, depth);
        return (naturalColor + reflectedColor);
    }

    private Color getReflectionColor(Thing thing, Vector pos, Vector normal, Vector rd, Scene scene, float depth)
    {
        return thing.surface.reflect(pos)*traceRay(new Ray {start = pos, dir = rd}, scene, depth + 1);
    }


    public static readonly object undefined = null;

    private Color getNaturalColor(Thing thing, Vector pos, Vector norm, Vector rd, Scene scene)
    {
        var addLight = new Func<Color, Light, Color>((col, light) =>
        {
            var ldis = light.pos - pos;
            var livec = Help.norm(ldis);
            var neatIsect = testRay(
                new Ray {start = pos, dir = livec}, scene);

            var isInShadow = !float.IsNaN(neatIsect) && neatIsect <= (float) ldis.LengthSquared;
            if (isInShadow)
            {
                return col;
            }
            else
            {
                var illum = (float) Vector.DotProduct(livec, norm);
                var lcolor = (illum > 0)
                    ? illum*light.color
                    : Color.defaultColor;
                var specular = Vector.DotProduct(livec, Help.norm(rd));
                var scolor = (specular > 0)
                    ? (float) Math.Pow(specular, thing.surface.roughness)*light.color
                    : Color.defaultColor;
                return (col + ((thing.surface.diffuse(pos)*lcolor) +
                               (thing.surface.specular(pos)*scolor)));
            }
        });
        return scene.lights.Aggregate(Color.defaultColor, addLight);
    }

    private void render(Scene scene)
    {
        var ctx = canvas;
        float screenWidth = ctx._width;
        float screenHeight = ctx._height;
        
        var getPoint = new Func<float, float, Camera, Vector>((x, y, camera) =>
        {
            var recenterX = new Func<float, float>(x1 => (x1 - (screenWidth/2.0f))/2.0f/screenWidth);
            var recenterY = new Func<float, float>(y1 => - (y1 - (screenHeight/2.0f))/2.0f/screenHeight);
            return Help.norm(camera.forward + recenterX(x)*camera.right + recenterY(y)*camera.up);
        });
        for (var y = 0; y < screenHeight; y++)
            for (var x = 0; x < screenWidth; x++)
            {
                var color = traceRay(new Ray {start = scene.camera.pos, dir = getPoint(x, y, scene.camera)}, scene, 0);
                ctx.set(x, y, color);
            }
    }

    public static Scene defaultScene()
    {
        return new Scene
        {
            things = new List<Thing>
            {
                new Plane(new Vector(0.0, 1.0, 0.0), 0.0f, Surfaces.checkerboard),
                new Sphere(new Vector(0.0, 1.0, -0.25), 1.0f, Surfaces.shiny),
                new Sphere(new Vector(-1.0, 0.5, 1.5), 0.5f, Surfaces.shiny)
            },
            lights = new List<Light>
            {
                new Light {pos = new Vector(-2.0, 2.5, 0.0), color = new Color(0.49f, 0.07f, 0.07f)},
                new Light {pos = new Vector(1.5, 2.5, 1.5), color = new Color(0.07f, 0.07f, 0.49f)},
                new Light {pos = new Vector(1.5, 2.5, -1.5), color = new Color(0.07f, 0.49f, 0.071f)},
                new Light {pos = new Vector(0.0, 3.5, 0.0), color = new Color(0.21f, 0.21f, 0.35f)}
            },
            camera = new Camera(new Vector(3.0, 2.0, 4.0), new Vector(-1.0, 0.5, 0.0))
        };
    }

    private canvas canvas;
    public RayTrace(int width,int heigth)
    {
        canvas = new canvas(width, heigth);
    }

    public canvas update()
    {
        render(defaultScene());
        return canvas;
    }
}

internal static class Surfaces
{
    public static shiny shiny = new shiny();
    public static checkerboard checkerboard = new checkerboard();
}

public class canvas
    {
    public readonly int _width;
    public readonly int _height;
        private readonly System.Windows.Media.Color[,] bytes;

        public canvas(int width, int height)
        {
            _width = width;
            _height = height;
            bytes = new System.Windows.Media.Color[width, height];
        }

        public void set(int x, int y, System.Windows.Media.Color color)
        {
            bytes[x, y] = color;
        }
    }


