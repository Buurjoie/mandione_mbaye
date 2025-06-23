// AddDataForm.js
import React, { useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ImagePlus } from "lucide-react";

function AjoutCompone() {
  const [certificateImg, setCertificateImg] = useState("");
  const [project, setProject] = useState({
    title: "",
    description: "",
    features: "",
    github: "",
    img: "",
    link: "",
    techStack: "",
    id: "",
  });
  const fileInputRef = useRef(null);
  const fileInputRefZ = useRef(null);

  const handleImageUpload = (e, setImgState) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgState(reader.result); // base64
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAddCertificate = async () => {
    if(!certificateImg) return alert("Veuillez choisir une image");
    try {
      await addDoc(collection(db, "certificates"), { Img: certificateImg });
      alert("Certificat ajouté");
    } catch (err) {
      console.error(err);
      alert("image trop lourd");
    }
  };

  const handleAddProject = async () => {
    try {
      await addDoc(collection(db, "projects"), {
        title: project.title,
        description: project.description,
        features: project.features.split(",").map((f) => f.trim()),
        github: project.github,
        img: project.img,
        link: project.link,
        techStack: project.techStack.split(",").map((t) => t.trim()),
        id: project.id,
      });
      alert("Projet ajouté");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div style={{ padding: 20, width: "50%", margin: "auto" }} >


      <div  className="px-4 pt-4 pb-2 mb-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group hover:shadow-lg hover:-translate-y-0.5">
           <h2 className="font-medium text-white" >Ajouter un Certificat</h2>
        <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
          <div
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-white">
              img <span className="text-red-400">*</span> {certificateImg ? <span className="text-green-400">Uploaded</span> : <span className="text-red-400">Not uploaded</span>}
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setCertificateImg)}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all border border-dashed border-indigo-500/50 hover:border-indigo-500 group"
            >
              <ImagePlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Choose Profile Photo</span>
            </button>
            <button
              onClick={handleAddCertificate}
              className="relative w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              Ajouter Certificat
            </button>
          </div>
        </div>
        </div>

     <div  className="px-4 pt-4 pb-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group hover:shadow-lg hover:-translate-y-0.5" >
            <h2 className=" font-medium text-white" >Ajouter un Projet</h2>
        <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
            <div
                className="space-y-2 mb-3"
            >
            <label className="block text-sm font-medium text-white">
              Titre <span className="text-red-400">*</span>
            </label>
          <input
            type="text"
            placeholder="Titre"
            onChange={(e) => setProject({ ...project, title: e.target.value })}
             className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          </div>
           <div
                className="space-y-2 mb-3"
            >
            <label className="block text-sm font-medium text-white">
              Description <span className="text-red-400">*</span>
            </label>
          <textarea
            placeholder="Description"
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none min-h-[120px]"
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />
          </div>
           <div
                className="space-y-2 mb-3"
            >
            <label className="block text-sm font-medium text-white">
              Fonctionnalités (séparées par virgule) <span className="text-red-400">*</span>
            </label>
          <input
            type="text"
            placeholder="Fonctionnalités (séparées par virgule)"
            onChange={(e) =>
              setProject({ ...project, features: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          </div>
           <div
                className="space-y-2 mb-3"
            >
            <label className="block text-sm font-medium text-white">
              Lien GitHub <span className="text-red-400">*</span>
            </label>
          <input
            type="text"
            placeholder="Lien GitHub"
            onChange={(e) => setProject({ ...project, github: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          </div>
           <div
                className="space-y-2 mb-3"
            >
            <label className="block text-sm font-medium text-white">
              Image <span className="text-red-400">*</span>
            </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleImageUpload(e, (img) => setProject({ ...project, img }))
            }
             ref={fileInputRefZ}
           className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRefZ.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all border border-dashed border-indigo-500/50 hover:border-indigo-500 group"
            >
              <ImagePlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Choose Profile Photo</span>
            </button>
          </div>
           <div
                className="space-y-2 mb-3"
            >
            <label className="block text-sm font-medium text-white">
              Lien du projet <span className="text-red-400">*</span>
            </label>
          <input
            type="text"
            placeholder="Lien du projet"
            onChange={(e) => setProject({ ...project, link: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
           </div>
           <div
                className="space-y-2 mb-3"
            >
            <label className="block text-sm font-medium text-white">
              Tech Stack (séparée par virgule) <span className="text-red-400">*</span>
            </label>
          <input
            type="text"
            placeholder="Tech Stack (séparée par virgule)"
            onChange={(e) =>
              setProject({ ...project, techStack: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          </div>
          <div
               className="space-y-2 mb-3"
            >
            <label className="block text-sm font-medium text-white">
              ID du projet <span className="text-red-400">*</span>
            </label>
          <input
            type="text"
            placeholder="ID du projet"
            onChange={(e) => setProject({ ...project, id: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          </div>
          <div   className="space-y-2 mt-2" >
           <button onClick={handleAddProject} className="relative w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">Ajouter Projet</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AjoutCompone;
