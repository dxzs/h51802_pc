const gulp = require("gulp"),
	sass = require("gulp-sass"),
	uglify = require("gulp-uglify"),
	babel = require("gulp-babel"),
	htmlmin = require("gulp-htmlmin"),
	connect = require("gulp-connect");
	//启动自动刷新
	gulp.task("conn",function(){
		connect.server({
			root : "dist",
			livereload : true
		});
	})
	//编译sass
gulp.task("sass",function(){
	gulp.src("src/sass/*.scss")
		.pipe(sass({outputStyle:"compressed"}))
		.pipe(gulp.dest("dist/css"))
//		.pipe(connect.reload());
});
//压缩html
gulp.task("html",function(){
	gulp.src("src/**/*.html")
		.pipe(htmlmin({collapseWhitespace:true}))
		.pipe(gulp.dest("dist"))
//		.pipe(connect.reload());
})
//压缩JS
gulp.task("js",function(){
	gulp.src("src/js/*.js")
		.pipe(babel({
			presets : ['env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
//		.pipe(connect.reload());
})
//复制lib
gulp.task("copy-lib",function(){
	gulp.src("src/lib/**/*.*")
		.pipe(gulp.dest("dist/lib"));
});
//复制img
gulp.task("copy-img",function(){
	gulp.src("src/img/**/*.*")
		.pipe(gulp.dest("dist/img"));
});
//复制mock
gulp.task("copy-mock",function(){
	gulp.src("src/mock/**/*.*")
		.pipe(gulp.dest("dist/mock"));
});
gulp.task("copy",["copy-lib","copy-img","copy-mock"])
//监视任务
gulp.task("watch",function(){
	gulp.watch("src/sass/*.scss",["sass"]);
	gulp.watch("src/**/*.html",["html"]);
	gulp.watch("src/js/*.js",["js"]);
});
//定义默认任务
gulp.task("default",["sass","html","copy","js","conn","watch"]);

