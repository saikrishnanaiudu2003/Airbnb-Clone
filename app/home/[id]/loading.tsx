import SkeletonCard from "@/app/component/SkeletonCard";

const Loading = ()=>{
    return(
    <section className="mx-auto container px-5 lg:px-10 mt-10">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
        <SkeletonCard/>
        <SkeletonCard/>
        <SkeletonCard/>
        <SkeletonCard/>
        <SkeletonCard/>
        <SkeletonCard/>
        <SkeletonCard/>
        <SkeletonCard/>

        </div>
        </section>
    )
}

export default Loading;